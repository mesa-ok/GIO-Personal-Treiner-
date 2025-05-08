
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

// Define the Note type using Supabase's generated types
type Note = Tables<'notes'>;

export default function NotePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch user's notes
  useEffect(() => {
    if (user) {
      fetchNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function fetchNotes() {
    setLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user?.id || '')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error loading notes",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setNotes(data);
    }
    setLoading(false);
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add a note",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase
      .from('notes')
      .insert({
        user_id: user.id,
        title: title.trim(),
        content: content.trim(),
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error creating note",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setNotes((prev) => [data, ...prev]);
      setTitle("");
      setContent("");
      toast({ title: "Note added successfully!" });
    }
    setSubmitting(false);
  }

  async function handleDeleteNote(id: string) {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id || '');

    if (error) {
      toast({
        title: "Error deleting note",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      toast({ title: "Note deleted successfully" });
    }
  }

  return (
    <div className="gio-container max-w-2xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 text-gio-orange">Your Notes</h1>
      <form
        onSubmit={handleAddNote}
        className="bg-gio-gray rounded-lg p-4 mb-6 space-y-3"
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          required
          maxLength={50}
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          required
          maxLength={500}
          className="resize-none h-20"
        />
        <Button
          type="submit"
          className="w-full"
          disabled={submitting || !title.trim() || !content.trim()}
        >
          {submitting ? "Saving..." : "Add Note"}
        </Button>
      </form>

      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="text-center text-gray-400">No notes found</div>
          ) : (
            notes.map((note) => (
              <div 
                key={note.id} 
                className="bg-white/5 rounded-lg p-4 flex flex-col gap-2 shadow"
              >
                <div className="flex justify-between items-center gap-2">
                  <div className="font-medium text-gio-orange">{note.title}</div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </Button>
                </div>
                <div className="text-sm text-white whitespace-pre-wrap">{note.content}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(note.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
