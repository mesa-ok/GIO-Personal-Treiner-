
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import ActionButton from '@/components/ui/ActionButton';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminAppointments = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['admin-appointments'],
    queryFn: async () => {
      // Modifichiamo la query per ottenere separatamente i dati dell'utente
      const { data, error } = await supabase
        .from('appointments')
        .select('*, user_id')
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      
      // Per ogni appuntamento, otteniamo i dati del profilo utente
      const appointmentsWithUserDetails = await Promise.all(
        data.map(async (appointment) => {
          if (appointment.user_id) {
            const { data: profileData, error: profileError } = await supabase
              .from('user_profiles')
              .select('nome, cognome')
              .eq('id', appointment.user_id)
              .single();
            
            return {
              ...appointment,
              user_profile: profileError ? null : profileData
            };
          }
          return { ...appointment, user_profile: null };
        })
      );
      
      return appointmentsWithUserDetails;
    },
  });

  const updateAppointment = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'confirmed' | 'cancelled' }) => {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-appointments'] });
      toast({
        title: status === 'confirmed' ? 'Appuntamento confermato' : 'Appuntamento cancellato',
        description: status === 'confirmed' 
          ? "L'appuntamento è stato confermato con successo"
          : "L'appuntamento è stato cancellato",
      });
    },
    onError: () => {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'aggiornamento dell'appuntamento",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="gio-card">
        <h2 className="text-xl font-semibold mb-4">Gestione Appuntamenti</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Titolo</TableHead>
              <TableHead>Data e Ora</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead>Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  {appointment.user_profile ? 
                    `${appointment.user_profile.nome} ${appointment.user_profile.cognome}` : 
                    'Utente sconosciuto'}
                </TableCell>
                <TableCell>{appointment.title}</TableCell>
                <TableCell>
                  {format(new Date(appointment.start_time), "d MMMM 'alle' HH:mm", { locale: it })}
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    appointment.status === 'pending_approval' && "bg-yellow-500/20 text-yellow-500",
                    appointment.status === 'confirmed' && "bg-green-500/20 text-green-500",
                    appointment.status === 'cancelled' && "bg-red-500/20 text-red-500"
                  )}>
                    {appointment.status === 'pending_approval' && "In attesa"}
                    {appointment.status === 'confirmed' && "Confermato"}
                    {appointment.status === 'cancelled' && "Cancellato"}
                  </span>
                </TableCell>
                <TableCell>
                  {appointment.status === 'pending_approval' && (
                    <div className="flex gap-2">
                      <ActionButton
                        size="sm"
                        onClick={() => updateAppointment.mutate({ 
                          id: appointment.id, 
                          status: 'confirmed' 
                        })}
                      >
                        <Check className="w-4 h-4" />
                      </ActionButton>
                      <ActionButton
                        variant="outline"
                        size="sm"
                        onClick={() => updateAppointment.mutate({ 
                          id: appointment.id, 
                          status: 'cancelled' 
                        })}
                      >
                        <X className="w-4 h-4" />
                      </ActionButton>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminAppointments;
