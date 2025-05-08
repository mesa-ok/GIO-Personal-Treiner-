
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminCreateAccount from "@/components/admin/AdminCreateAccount";

const ADMIN_EMAIL = 'admin@giofitness.com';
const ADMIN_PASSWORD = 'Admin123!';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminAndSession = async () => {
      setLoading(true);
      try {
        console.log("Verifica sessione utente e account admin...");
        
        // Verifica se c'è una sessione attiva
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          console.log("Sessione attiva trovata, verifica ruolo...");
          const { data: userData, error: roleError } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", sessionData.session.user.id);

          if (roleError) {
            console.log("Errore verifica ruolo:", roleError);
          }

          const isAdmin = userData && userData.some(r => r.role === 'admin');
          
          if (isAdmin) {
            console.log("Utente con ruolo admin, reindirizzamento...");
            navigate("/admin");
            return;
          } else {
            console.log("Utente connesso ma non è admin");
            // Logout se l'utente è connesso ma non è admin
            await supabase.auth.signOut();
          }
        } else {
          console.log("Nessuna sessione attiva");
        }
        
        // Verifica se esiste almeno un account admin nel sistema
        const { data, error } = await supabase
          .from("user_roles")
          .select("*")
          .eq("role", "admin");
          
        if (error) {
          console.error("Errore verifica admin:", error);
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.log("Nessun account admin trovato, attivazione creazione...");
          setCreatingAdmin(true);
        } else {
          console.log("Trovati account admin:", data.length);
          setCreatingAdmin(false);
        }
      } catch (error) {
        console.error("Errore verifica sessione o admin:", error);
        toast({
          title: "Errore di verifica",
          description: "Impossibile verificare lo stato dell'account amministratore",
          variant: "destructive",
        });
        // In caso di errore, mostriamo comunque il form di login normale
        setCreatingAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminAndSession();
  }, [navigate, toast]);

  // shared login for child components
  const loginHandler = React.useCallback(async () => {
    setLoading(true);
    try {
      console.log("Tentativo login con credenziali di default...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });
      
      if (error) {
        console.error("Errore login:", error);
        throw error;
      }
      
      if (data && data.user) {
        console.log("Login riuscito, verifica ruolo...");
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id);
          
        if (roleError) {
          console.error("Errore verifica ruolo:", roleError);
          throw roleError;
        }
        
        const isAdmin = roleData && roleData.some(r => r.role === 'admin');
        
        if (isAdmin) {
          console.log("Ruolo admin confermato, reindirizzamento...");
          toast({
            title: 'Accesso riuscito',
            description: 'Benvenuto nel pannello amministratore'
          });
          navigate('/admin');
        } else {
          console.log("L'utente non ha il ruolo di admin");
          await supabase.auth.signOut();
          throw new Error("L'account non ha il ruolo di amministratore");
        }
      }
    } catch (error) {
      console.error("Errore login completo:", error);
      toast({
        title: 'Errore di accesso',
        description: 'Impossibile accedere come amministratore. ' + (error.message || 'Verifica le credenziali.'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [navigate, toast]);

  return (
    <div className="gio-container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gio-orange">
            Area Amministratore
          </CardTitle>
        </CardHeader>
        {creatingAdmin ? (
          <AdminCreateAccount
            loading={loading}
            onLoadingChange={setLoading}
            setCreatingAdmin={setCreatingAdmin}
            onLogin={loginHandler}
          />
        ) : (
          <AdminLoginForm
            loading={loading}
            onLoadingChange={setLoading}
          />
        )}
      </Card>
    </div>
  );
}
