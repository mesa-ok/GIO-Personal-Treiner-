
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, LineChart, User, Settings, NotebookPen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  
  React.useEffect(() => {
    if (user) {
      const checkAdminStatus = async () => {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();
        
        setIsAdmin(data?.role === 'admin');
      };
      
      checkAdminStatus();
    }
  }, [user]);
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Workouts', path: '/workouts', icon: Dumbbell },
    { name: 'Progress', path: '/progress', icon: LineChart },
    { name: 'Note', path: '/notes', icon: NotebookPen },
    { name: 'Profile', path: '/profile', icon: User },
    ...(isAdmin ? [{ name: 'Admin', path: '/admin', icon: Settings }] : []),
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-gio-darkgray border-t border-gio-gray shadow-lg">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path}
            className={`bottom-nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon className="w-6 h-6" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
