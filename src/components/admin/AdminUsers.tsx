
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { Calendar, FileText, ListCheck, Utensils } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type UserProfile = {
  id: string;
  nome: string;
  cognome: string;
  email?: string;
  telefono?: string;
  ultima_attivita?: string;
  livello_fitness?: string;
};

const AdminUsers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  const { data: userProfiles = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // Query per ottenere tutti i profili utente con relativo indirizzo email
      const { data: profiles, error } = await supabase
        .from('user_profiles')
        .select('*');
      
      if (error) throw error;
      
      // Per ogni profilo, otteniamo l'email dalla tabella auth.users
      // Nota: abbiamo bisogno di una query separata poiché non possiamo joinare direttamente con auth.users
      const profilesWithEmail = await Promise.all(
        profiles.map(async (profile) => {
          const { data: userData, error: userError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.id)
            .eq('role', 'cliente')
            .single();
          
          // Includiamo solo i profili con ruolo 'cliente'
          if (userError || !userData) return null;
          
          return {
            ...profile
          };
        })
      );
      
      // Filtriamo eventuali risultati null
      return profilesWithEmail.filter(Boolean) as UserProfile[];
    },
  });

  const filteredUsers = userProfiles.filter(user => 
    user.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cognome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gestione del click su un utente
  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  if (isLoading) {
    return <div>Caricamento utenti in corso...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestione Clienti</CardTitle>
          <CardDescription>
            Visualizza e gestisci i tuoi clienti, assegna programmi e monitora i loro progressi
          </CardDescription>
          
          <div className="mt-2">
            <Input 
              placeholder="Cerca cliente per nome..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefono</TableHead>
                <TableHead>Livello Fitness</TableHead>
                <TableHead>Ultima Attività</TableHead>
                <TableHead>Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow 
                    key={user.id}
                    className={selectedUserId === user.id ? "bg-gio-gray/30" : ""}
                    onClick={() => handleUserClick(user.id)}
                  >
                    <TableCell className="font-medium">
                      {user.nome} {user.cognome}
                    </TableCell>
                    <TableCell>{user.telefono || 'Non specificato'}</TableCell>
                    <TableCell>{user.livello_fitness || 'Non specificato'}</TableCell>
                    <TableCell>
                      {user.ultima_attivita 
                        ? format(new Date(user.ultima_attivita), "d MMMM yyyy", { locale: it })
                        : 'Mai'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast({
                              title: 'Funzionalità in sviluppo',
                              description: 'Assegnazione programmi in arrivo presto!',
                            });
                          }}
                        >
                          <ListCheck className="h-4 w-4" />
                          <span className="hidden sm:inline">Programma</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast({
                              title: 'Funzionalità in sviluppo',
                              description: 'Assegnazione diete in arrivo presto!',
                            });
                          }}
                        >
                          <Utensils className="h-4 w-4" />
                          <span className="hidden sm:inline">Dieta</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    {searchTerm 
                      ? 'Nessun cliente trovato con questo nome.' 
                      : 'Nessun cliente disponibile.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedUserId && (
        <Card>
          <CardHeader>
            <CardTitle>
              {userProfiles.find(u => u.id === selectedUserId)?.nome} {userProfiles.find(u => u.id === selectedUserId)?.cognome}
            </CardTitle>
            <CardDescription>
              Dettagli cliente e assegnazione materiali
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info">
              <TabsList>
                <TabsTrigger value="info">Informazioni</TabsTrigger>
                <TabsTrigger value="programs">Programmi</TabsTrigger>
                <TabsTrigger value="diet">Dieta</TabsTrigger>
                <TabsTrigger value="appointments">Appuntamenti</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-4">
                <div className="space-y-2">
                  <p><strong>Telefono:</strong> {userProfiles.find(u => u.id === selectedUserId)?.telefono || 'Non specificato'}</p>
                  <p><strong>Livello fitness:</strong> {userProfiles.find(u => u.id === selectedUserId)?.livello_fitness || 'Non specificato'}</p>
                  <p><strong>Ultima attività:</strong> {userProfiles.find(u => u.id === selectedUserId)?.ultima_attivita 
                    ? format(new Date(userProfiles.find(u => u.id === selectedUserId)!.ultima_attivita!), "d MMMM yyyy", { locale: it })
                    : 'Mai'}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="programs" className="mt-4">
                <div className="text-center py-8">
                  <ListCheck className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nessun programma assegnato</h3>
                  <p className="text-gray-500 mb-4">Non hai ancora assegnato programmi di allenamento a questo cliente.</p>
                  <Button
                    onClick={() => {
                      toast({
                        title: 'Funzionalità in sviluppo',
                        description: 'Assegnazione programmi in arrivo presto!',
                      });
                    }}
                  >
                    <ListCheck className="h-4 w-4 mr-2" />
                    Assegna Programma
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="diet" className="mt-4">
                <div className="text-center py-8">
                  <Utensils className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nessun piano alimentare assegnato</h3>
                  <p className="text-gray-500 mb-4">Non hai ancora assegnato piani alimentari a questo cliente.</p>
                  <Button
                    onClick={() => {
                      toast({
                        title: 'Funzionalità in sviluppo',
                        description: 'Assegnazione diete in arrivo presto!',
                      });
                    }}
                  >
                    <Utensils className="h-4 w-4 mr-2" />
                    Assegna Piano Alimentare
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="appointments" className="mt-4">
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Gestisci Appuntamenti</h3>
                  <p className="text-gray-500 mb-4">Visualizza e gestisci gli appuntamenti per questo cliente.</p>
                  <Button
                    onClick={() => toast({
                      title: 'Reindirizzamento',
                      description: 'Vai alla sezione appuntamenti per gestire le prenotazioni',
                    })}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Gestisci Appuntamenti
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminUsers;
