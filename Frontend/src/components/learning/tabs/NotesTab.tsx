import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Note {
    timestamp: string;
    text: string;
}

interface NotesTabProps {
    notes: Note[];
    onAddNote: (text: string) => void;
}

export function NotesTab({ notes, onAddNote }: NotesTabProps) {
    const [noteText, setNoteText] = useState('');

    const handleAddNote = () => {
        if (noteText.trim()) {
            onAddNote(noteText);
            setNoteText('');
        }
    };

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                    <Input
                        placeholder="Add a note for this timestamp..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="flex-1"
                    />
                    <Button onClick={handleAddNote}>Add Note</Button>
                </div>

                <div className="space-y-3">
                    {notes.map((note, index) => (
                        <div key={index} className="bg-muted p-3 rounded-md">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded">
                                    {note.timestamp}
                                </span>
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                    Edit
                                </Button>
                            </div>
                            <p className="text-sm">{note.text}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
