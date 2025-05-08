
import React, { useState } from 'react';
import { Bell, Check, ArrowLeft, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/sonner";

type Notification = {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
};

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
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
    {
      id: '4',
      message: 'Ricordati di bere abbastanza acqua oggi',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 giorni fa
      read: true,
    },
    {
      id: '5',
      message: 'Una nuova sfida settimanale è disponibile',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 giorni fa
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
  
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    toast.success("Tutte le notifiche segnate come lette");
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
    toast.success("Notifica eliminata");
  };
  
  return (
    <div className="gio-container pt-4">
      <div className="flex items-center gap-2 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded-full bg-gio-gray hover:bg-gio-darkgray"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="gio-heading flex items-center gap-2 mb-0">
          <Bell className="text-gio-orange" />
          Le mie notifiche
        </h1>
      </div>
      
      {notifications.filter(n => !n.read).length > 0 && (
        <button 
          onClick={markAllAsRead}
          className="mb-4 bg-gio-darkgray hover:bg-gio-gray px-4 py-2 rounded-md text-white"
        >
          Segna tutte come lette
        </button>
      )}
      
      <div className="gio-card">
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start p-3 rounded-lg border-b border-gio-gray ${notification.read ? 'bg-transparent' : 'bg-gio-gray'}`}
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
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 bg-gio-gray hover:bg-gio-darkgray rounded-md"
                      title="Segna come letta"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 bg-gio-gray hover:bg-red-900 rounded-md"
                    title="Elimina notifica"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Bell className="mx-auto w-12 h-12 text-gray-500 mb-2" />
              <p className="text-gray-400">Non hai notifiche</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
