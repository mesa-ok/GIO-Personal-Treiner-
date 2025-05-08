
import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Usa le stesse credenziali admin mostrate nell'UI
const ADMIN_EMAIL = 'admin@giofitness.com';
const ADMIN_PASSWORD = 'Admin123!';

interface AdminCreateAccountProps {
  loading: boolean;
  onLoadingChange: (loading: boolean) => void;
  setCreatingAdmin: (val: boolean) => void;
  onLogin: () => Promise<void>;
}

export default function AdminCreateAccount({
  loading,
  onLoadingChange,
  setCreatingAdmin,
  onLogin,
}: AdminCreateAccountProps) {
  const { toast } = useToast();

  const createAdminAccount = async () => {
    onLoadingChange(true);
    try {
      console.log("Tentativo di creazione account amministratore...");
      
      // Prima creiamo l'account utente
      console.log("Creazione nuovo utente...");
      const { data, error } = await supabase.auth.signUp({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        options: {
          data: {
            nome: "Amministratore",
            cognome: "GIO Fitness"
          }
        }
      });
      
      if (error) {
        console.error("Errore nella creazione utente:", error.message);
        
        // Se l'errore è "User already registered", proviamo a fare login direttamente
        if (error.message.includes("already registered")) {
          console.log("Utente già registrato, tentativo login...");
          toast({
            title: 'Utente già registrato',
            description: 'Effettueremo il login con le credenziali fornite.',
          });
          
          // Aspetta un attimo prima di tentare il login
          setTimeout(async () => {
            await onLogin();
          }, 500);
          return;
        } else {
          throw error;
        }
      }
      
      // Se l'utente è stato creato con successo
      if (data?.user) {
        const userId = data.user.id;
        console.log("Utente creato con successo, ID:", userId);
        
        // Aspetta un attimo prima di assegnare il ruolo (per permettere al trigger di creare il profilo)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Assegna il ruolo admin
        console.log("Assegnazione ruolo admin all'utente:", userId);
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: 'admin',
          });
          
        if (insertError) {
          console.error("Errore inserimento ruolo:", insertError.message);
          if (!insertError.message.includes('duplicate key')) {
            throw insertError;
          }
        }
        
        toast({
          title: 'Account amministratore creato',
          description: 'Accesso come amministratore in corso...',
        });
        
        // Aspetta un attimo prima di tentare il login
        setTimeout(async () => {
          await onLogin();
        }, 1000);
      } else {
        throw new Error("Impossibile ottenere l'ID utente dopo la creazione");
      }
    } catch (error) {
      console.error('Errore completo:', error);
      toast({
        title: 'Errore di creazione/accesso',
        description: 'Dettaglio: ' + (error.message || 'Errore sconosciuto'),
        variant: 'destructive',
      });
      onLoadingChange(false);
    }
  };

  return (
    <CardContent>
      <div className="space-y-4">
        <p className="text-center mb-4">
          Non esiste ancora un account amministratore. Verrà creato un account con le seguenti credenziali:
        </p>
        <div className="bg-gio-darkgray p-3 rounded border border-gio-gray text-center">
          <p>Email: <span className="text-gio-orange">{ADMIN_EMAIL}</span></p>
          <p>Password: <span className="text-gio-orange">{ADMIN_PASSWORD}</span></p>
        </div>
        <Button
          className="w-full bg-gio-orange hover:bg-gio-orange/90"
          disabled={loading}
          onClick={createAdminAccount}
        >
          {loading ? 'Creazione in corso...' : 'Crea Account Amministratore'}
        </Button>
      </div>
    </CardContent>
  );
}
