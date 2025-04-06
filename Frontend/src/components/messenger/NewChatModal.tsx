'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';

interface NewChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectMember: (member: any) => void;
    labMembers: any[];
}

export default function NewChatModal({ isOpen, onClose, onSelectMember, labMembers }: NewChatModalProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(labMembers);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults(labMembers);
        } else {
            const filteredMembers = labMembers.filter((member) =>
                member.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filteredMembers);
        }
    }, [searchTerm, labMembers]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>New Conversation</DialogTitle>
                </DialogHeader>

                <div className="relative my-2">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search for lab members..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>

                <ScrollArea className="max-h-[300px] mt-2">
                    {searchResults.length > 0 ? (
                        <div className="space-y-1">
                            {searchResults.map((member) => (
                                <div
                                    key={member.id}
                                    onClick={() => {
                                        onSelectMember(member);
                                        onClose();
                                    }}
                                    className="flex items-center p-3 cursor-pointer hover:bg-accent rounded-md">
                                    <div className="relative">
                                        <Avatar>
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback>{member.initials}</AvatarFallback>
                                        </Avatar>
                                        {member.online && (
                                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-4 text-muted-foreground">
                            No members found matching your search
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
