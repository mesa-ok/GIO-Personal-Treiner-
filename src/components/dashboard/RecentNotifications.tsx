
import React from 'react';
import { Bell, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { toast } from "@/components/ui/sonner";
import { useNavigate } from 'react-router-dom';

type Notification = {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
};

const RecentNotifications = () => {
  const navigate = useNavigate();
  // Esempio di notifiche per mostrare la funzionalità
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      message: 'Nuovo piano allenamento disponibile',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minuti fa
      read: false,
    },
    {
      id: '2',
      message: 'Complimenti! Hai completato 3 allenamenti questa settimana',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 ore fa
      read: true,
    },
    {
      id: '3',
      message: 'Il tuo obiettivo settimanale di calorie è stato aggiornato',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 giorno fa
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    toast.success("Notifica segnata come letta");
  };

  const viewAllNotifications = () => {
    navigate('/notifications');
  };

  return (
    <div className="gio-card mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="gio-subheading flex items-center gap-2">
          <Bell className="text-gio-orange" />
          Notifiche Recenti
        </h2>
        <span className="text-xs bg-gio-orange text-black px-2 py-1 rounded-full">
          {notifications.filter(n => !n.read).length} nuove
        </span>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`flex items-start p-2 rounded-lg ${notification.read ? 'bg-transparent' : 'bg-gio-gray'}`}
            >
              <div className={`mr-3 mt-1 w-2 h-2 rounded-full ${notification.read ? 'bg-gray-500' : 'bg-gio-orange'}`} />
              <div className="flex-1">
                <p className={`${notification.read ? 'text-gray-300' : 'text-white'}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: it })}
                </p>
              </div>
              {notification.read ? (
                <Check className="w-4 h-4 text-gray-400" />
              ) : (
                <button 
                  onClick={() => markAsRead(notification.id)}
                  className="px-2 py-1 text-xs bg-gio-gray hover:bg-gio-darkgray rounded-md text-gray-300"
                >
                  Segna letta
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-4">Nessuna notifica recente</p>
        )}
      </div>
      
      <button 
        className="w-full text-sm text-gio-orange mt-3 py-2 hover:underline"
        onClick={viewAllNotifications}
      >
        Vedi tutte le notifiche
      </button>
    </div>
  );
};

export default RecentNotifications;
