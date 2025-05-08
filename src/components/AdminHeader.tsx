
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Settings, LogIn } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminHeader = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  
  React.useEffect(() => {
    if (user) {
      const checkIfAdmin = async () => {
        try {
          const { data } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .eq('role', 'admin')
            .single();
          
          setIsAdmin(!!data);
        } catch (error) {
          console.error('Errore verifica ruolo admin:', error);
          setIsAdmin(false);
        }
      };
      
      checkIfAdmin();
    } else {
      setIsAdmin(false);
    }
  }, [user]);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-gio-darkgray border-b border-gio-gray shadow-md py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-gio-orange font-bold text-xl">GIO Fitness</h1>
        </div>
        
        <div>
          <Link to="/admin-login">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              {isAdmin ? (
                <>
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Amministratore</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Login Admin</span>
                </>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
