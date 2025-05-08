
import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format, isPast } from 'date-fns';
import { it } from 'date-fns/locale';
import { Card, CardContent } from '../ui/card';
import ActionButton from '../ui/ActionButton';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAppointments, AppointmentStatus, Appointment } from '@/hooks/useAppointments';
import { AppointmentDialog } from './AppointmentDialog';
import { Badge } from '../ui/badge';

const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
  const statusConfig = {
    pending_approval: { text: 'In attesa', bgColor: 'bg-yellow-500/20 text-yellow-500' },
    confirmed: { text: 'Confermato', bgColor: 'bg-green-500/20 text-green-500' },
    cancelled: { text: 'Cancellato', bgColor: 'bg-red-500/20 text-red-500' },
  };
  
  // Ensure we have a valid status before accessing the configuration
  const config = statusConfig[status] || { text: 'Stato sconosciuto', bgColor: 'bg-gray-500/20 text-gray-500' };

  return (
    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', config.bgColor)}>
      {config.text}
    </span>
  );
};

const UpcomingAppointments = () => {
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const { appointments, isLoading, confirmAppointment } = useAppointments();

  const futureAppointments = appointments.filter(
    appointment => !isPast(new Date(appointment.start_time))
  );

  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gio-gray rounded w-1/4"></div>
          <div className="h-32 bg-gio-gray rounded"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="gio-heading flex items-center gap-2 mb-0">
          <Calendar className="text-gio-orange" />
          Prossimi Appuntamenti
        </h2>
        <ActionButton variant="outline" size="sm" onClick={() => setIsBookDialogOpen(true)}>
          Prenota
        </ActionButton>
      </div>
      
      <div className="space-y-4">
        {futureAppointments.length > 0 ? (
          futureAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:border-gio-orange/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{appointment.title}</h3>
                      <StatusBadge status={appointment.status} />
                    </div>
                    
                    <div className="grid gap-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gio-orange" />
                        <span>
                          {format(new Date(appointment.start_time), "d MMMM 'alle' HH:mm", { locale: it })}
                          {appointment.duration && ` · ${appointment.duration} min`}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gio-orange" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <ActionButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      Dettagli
                    </ActionButton>
                    {appointment.status === 'pending_approval' && (
                      <ActionButton 
                        variant="outline" 
                        size="sm"
                        onClick={() => confirmAppointment.mutate(appointment.id)}
                      >
                        Conferma
                      </ActionButton>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            Nessun appuntamento programmato
          </div>
        )}
      </div>

      <AppointmentDialog
        open={isBookDialogOpen}
        onOpenChange={setIsBookDialogOpen}
      />

      {selectedAppointment && (
        <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedAppointment.title}</DialogTitle>
              <DialogDescription>
                Dettagli dell'appuntamento
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gio-orange" />
                  <span>
                    {format(new Date(selectedAppointment.start_time), "d MMMM yyyy 'alle' HH:mm", { locale: it })}
                    {selectedAppointment.duration && ` · ${selectedAppointment.duration} min`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gio-orange" />
                  <span>{selectedAppointment.location}</span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    Tipo: <span className="text-white">{selectedAppointment.type || 'N/A'}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Stato: <StatusBadge status={selectedAppointment.status} />
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              {selectedAppointment.status === 'pending_approval' ? (
                <ActionButton 
                  onClick={() => {
                    confirmAppointment.mutate(selectedAppointment.id);
                    setSelectedAppointment(null);
                  }}
                >
                  Conferma appuntamento
                </ActionButton>
              ) : (
                <ActionButton 
                  variant="outline"
                  onClick={() => setSelectedAppointment(null)}
                >
                  Chiudi
                </ActionButton>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default UpcomingAppointments;
