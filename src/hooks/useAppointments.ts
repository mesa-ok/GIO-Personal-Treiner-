
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export type AppointmentStatus = 'pending_approval' | 'confirmed' | 'cancelled';

export interface Appointment {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  location: string;
  status: AppointmentStatus;
  description?: string;
  user_id?: string;
  coach_id?: string;
  created_at?: string;
  updated_at?: string;
  type?: string;
  duration?: number;
}

export function useAppointments() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      
      // Calculate duration in minutes from start and end time
      return data.map((appointment) => {
        const start = new Date(appointment.start_time);
        const end = new Date(appointment.end_time);
        const durationMinutes = Math.round((end.getTime() - start.getTime()) / (1000 * 60));
        
        return {
          ...appointment,
          duration: durationMinutes,
          status: appointment.status as AppointmentStatus
        };
      });
    },
  });

  const confirmAppointment = useMutation({
    mutationFn: async (appointmentId: string) => {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'confirmed' })
        .eq('id', appointmentId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: "Appuntamento confermato",
        description: "L'appuntamento è stato confermato con successo",
      });
    },
    onError: () => {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la conferma dell'appuntamento",
        variant: "destructive",
      });
    },
  });

  return {
    appointments,
    isLoading,
    confirmAppointment,
  };
}
