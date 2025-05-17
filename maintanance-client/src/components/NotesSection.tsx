
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Note } from '@/types/ticket';
import { User } from 'lucide-react';
import { format } from 'date-fns';

interface NotesSectionProps {
  notes: Note[];
  onAddNote: (note: string) => void;
}

const NotesSection = ({ notes, onAddNote }: NotesSectionProps) => {
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!newNote.trim()) return;
    
    setIsSubmitting(true);
    onAddNote(newNote.trim());
    setNewNote('');
    // In a real app, we'd wait for the response before setting isSubmitting back to false
    setTimeout(() => setIsSubmitting(false), 500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes & Updates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {notes.length > 0 ? (
            notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((note) => (
                <div key={note.id} className="p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-primary/10 p-1 rounded-full">
                      <User className="w-3 h-3 text-primary" />
                    </div>
                    <span className="font-medium text-sm">{note.createdBy}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(note.createdAt), 'MMM dd, yyyy • h:mm a')}
                    </span>
                  </div>
                  <p className="text-sm">{note.text}</p>
                </div>
              ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">No notes yet</div>
          )}
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Add a note</h4>
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter your note here..."
            className="mb-3"
            rows={3}
          />
          <Button 
            onClick={handleSubmit} 
            disabled={!newNote.trim() || isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Adding...' : 'Add Note'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesSection;
