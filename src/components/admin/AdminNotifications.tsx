
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Bell, Check } from 'lucide-react';

type AdminNotification = {
  id: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
  related_user_id: string;
};

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
    subscribeToNewNotifications();
  }, []);

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('admin_notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile caricare le notifiche',
        variant: 'destructive',
      });
      return;
    }

    setNotifications(data || []);
  };

  const subscribeToNewNotifications = () => {
    const channel = supabase
      .channel('admin-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_notifications',
        },
        (payload) => {
          setNotifications(prev => [payload.new as AdminNotification, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('admin_notifications')
      .update({ read: true })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile segnare la notifica come letta',
        variant: 'destructive',
      });
      return;
    }

    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div className="gio-card">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="text-gio-orange" />
        <h2 className="gio-subheading mb-0">Notifiche Admin</h2>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-400 py-4">
            Nessuna notifica
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border border-gio-gray ${
                notification.read ? 'bg-transparent' : 'bg-gio-gray'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white">{notification.message}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(notification.created_at).toLocaleString('it-IT')}
                  </p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-2 bg-gio-gray hover:bg-gio-darkgray rounded-md"
                    title="Segna come letta"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
