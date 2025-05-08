import React from 'react';
import ActionButton from '@/components/ui/ActionButton';
import { User, Mail, Calendar, Clock, Bell, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import AdminNotifications from '@/components/admin/AdminNotifications';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: 'Logout effettuato',
        description: 'Hai effettuato il logout con successo',
      });
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Errore',
        description: 'Si è verificato un errore durante il logout',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="gio-container">
      <div className="mb-8 text-center">
        <div className="w-24 h-24 bg-gio-gray rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="w-12 h-12 text-gio-orange" />
        </div>
        <h1 className="text-2xl font-bold mb-1">
          {user?.user_metadata?.nome} {user?.user_metadata?.cognome || 'Atleta GIO'}
        </h1>
        <p className="text-gray-400">
          {user?.email || 'Email non disponibile'}
        </p>
      </div>
      
      {/* Show admin notifications for admin users */}
      {user?.user_metadata?.role === 'admin' && (
        <div className="mb-6">
          <AdminNotifications />
        </div>
      )}
      
      <div className="gio-card mb-6">
        <h2 className="gio-subheading">Informazioni personali</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-gio-orange mr-3" />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p>atleta@example.com</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gio-orange mr-3" />
            <div>
              <p className="text-sm text-gray-400">Data di nascita</p>
              <p>15/05/1990</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="gio-card mb-6">
        <h2 className="gio-subheading">Abbonamento</h2>
        <div className="p-3 bg-gio-gray rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Piano Premium</p>
              <p className="text-sm text-gray-400">Accesso completo</p>
            </div>
            <span className="text-gio-orange font-medium">Attivo</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <p>Prossimo rinnovo il 15/05/2025</p>
          <ActionButton variant="outline" size="sm">
            Gestisci
          </ActionButton>
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <button className="w-full gio-card flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gio-orange mr-3" />
            <span>Cronologia allenamenti</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        
        <button className="w-full gio-card flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-gio-orange mr-3" />
            <span>Notifiche</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      
      <ActionButton variant="outline" className="w-full" onClick={handleLogout}>
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </ActionButton>
    </div>
  );
};

export default Profile;
