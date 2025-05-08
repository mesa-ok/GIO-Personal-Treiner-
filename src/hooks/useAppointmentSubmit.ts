
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";
import { AppointmentFormValues } from "@/lib/schemas/appointmentSchema";

export function useAppointmentSubmit() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitAppointment = async (values: AppointmentFormValues) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        toast({
          title: "Errore di autenticazione",
          description: "Devi essere autenticato per prenotare un appuntamento",
          variant: "destructive",
        });
        return false;
      }
      
      const userId = sessionData.session.user.id;
      
      const dateTime = new Date(values.date);
      const [hours, minutes] = values.time.split(':');
      dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));

      const endTime = new Date(dateTime.getTime() + 60 * 60 * 1000);

      const { error } = await supabase.from('appointments').insert({
        title: values.title,
        location: values.location,
        description: values.description || null,
        start_time: dateTime.toISOString(),
        end_time: endTime.toISOString(),
        status: 'pending_approval',
        user_id: userId
      });

      if (error) {
        console.error("Error creating appointment:", error);
        throw error;
      }

      toast({
        title: "Appuntamento creato",
        description: "L'appuntamento è stato creato con successo",
      });
      
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      return true;
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la creazione dell'appuntamento",
        variant: "destructive",
      });
      return false;
    }
  };

  return { submitAppointment };
}
