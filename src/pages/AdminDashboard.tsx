
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminAppointments from '@/components/admin/AdminAppointments';
import AdminNotifications from '@/components/admin/AdminNotifications';
import AdminUsers from '@/components/admin/AdminUsers';
import { Button } from '@/components/ui/button';
import { LogOut, Users, Calendar, Bell, ListCheck } from 'lucide-react';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Verifica se l'utente è autenticato e ha il ruolo admin
  React.useEffect(() => {
    const checkAdminAccess = async () => {
      setLoading(true);
      try {
        if (!user) {
          navigate('/admin-login');
          return;
        }

        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (!roles || roles.role !== 'admin') {
          navigate('/');
        }
      } catch (error) {
        console.error("Errore verifica admin:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gio-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gio-orange"></div>
      </div>
    );
  }

  return (
    <div className="gio-container pt-6 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gio-orange">Dashboard Amministratore</h1>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Appuntamenti</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifiche</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Clienti</span>
          </TabsTrigger>
          <TabsTrigger value="workouts" className="flex items-center gap-2">
            <ListCheck className="h-4 w-4" />
            <span>Workouts</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="appointments">
          <AdminAppointments />
        </TabsContent>
        
        <TabsContent value="notifications">
          <AdminNotifications />
        </TabsContent>
        
        <TabsContent value="users">
          <AdminUsers />
        </TabsContent>
        
        <TabsContent value="workouts">
          <div className="gio-card">
            <h2 className="text-xl font-semibold mb-4">Gestione Workouts</h2>
            <p className="text-gray-400">
              Qui sarà possibile creare e gestire programmi di allenamento da assegnare ai clienti.
              Funzionalità in sviluppo.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
