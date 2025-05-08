
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { CardContent } from "@/components/ui/card";

// Assicuriamoci che le credenziali siano consistenti in tutta l'app
const ADMIN_EMAIL = 'admin@giofitness.com';
const ADMIN_PASSWORD = 'Admin123!';

interface AdminLoginFormProps {
  initialEmail?: string;
  initialPassword?: string;
  loading: boolean;
  onLoadingChange: (loading: boolean) => void;
  onLoginSuccess?: () => void;
}

export default function AdminLoginForm({
  initialEmail = ADMIN_EMAIL,
  initialPassword = ADMIN_PASSWORD,
  loading,
  onLoadingChange,
  onLoginSuccess,
}: AdminLoginFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onLoadingChange(true);
    
    try {
      console.log("Tentativo di login con:", email);
      
      // Prima proviamo il login standard
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Errore login admin:", error);
        throw error;
      }

      if (data && data.user) {
        console.log("Login riuscito, verifica ruolo...");
        
        // Verifica ruolo admin
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .eq('role', 'admin');
          
        if (roleError) {
          console.error("Errore verifica ruolo:", roleError);
          throw roleError;
        }

        const isAdmin = roleData && roleData.length > 0;
        
        if (isAdmin) {
          console.log("Ruolo admin confermato, accesso completato");
          toast({
            title: 'Accesso amministratore effettuato',
            description: 'Benvenuto nell\'area amministrativa',
          });
          if (onLoginSuccess) onLoginSuccess();
          navigate('/admin');
        } else {
          console.error("L'utente non ha il ruolo di admin");
          await supabase.auth.signOut();
          toast({
            title: 'Accesso negato',
            description: 'Non hai i permessi di amministratore',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      console.error('Errore login admin:', error);
      
      // In caso di errore "Invalid login credentials" potrebbe essere che l'admin esiste
      // ma con password diversa. Mostriamo un messaggio specifico.
      if (error.message && error.message.includes("Invalid login credentials")) {
        toast({
          title: 'Credenziali non valide',
          description: 'Le credenziali admin potrebbero essere state modificate. Prova a inserire la password corretta.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Errore di accesso',
          description: error.message || 'Impossibile accedere come amministratore. Verifica le credenziali.',
          variant: 'destructive',
        });
      }
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email Amministratore
          </label>
          <div className="flex">
            <div className="bg-gio-gray flex items-center px-3 rounded-l-md border-r-0 border border-gio-gray">
              <User className="h-5 w-5 text-gio-orange" />
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-l-none"
              placeholder={ADMIN_EMAIL}
              required
              autoComplete="username"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="flex">
            <div className="bg-gio-gray flex items-center px-3 rounded-l-md border-r-0 border border-gio-gray">
              <Lock className="h-4 w-4 text-gio-orange" />
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-l-none"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gio-orange hover:bg-gio-orange/90"
          disabled={loading}
        >
          {loading ? 'Accesso in corso...' : 'Accedi come Amministratore'}
        </Button>
        
        <div className="text-sm text-center mt-4 text-gray-400">
          <p>Utilizza le credenziali di amministratore</p>
          <p>Email: {ADMIN_EMAIL}</p>
          <p>Password: {ADMIN_PASSWORD}</p>
        </div>
      </form>
    </CardContent>
  );
}
