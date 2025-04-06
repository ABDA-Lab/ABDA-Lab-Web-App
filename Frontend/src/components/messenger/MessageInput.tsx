'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Send, Smile, ThumbsUp, X, ImageIcon } from 'lucide-react';

interface MessageInputProps {
    onSendMessage: (message: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
    const [newMessage, setNewMessage] = useState('');
    const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        onSendMessage(newMessage);
        setNewMessage('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t p-3 bg-background shrink-0">
            <div className="relative">
                {showAttachmentOptions && (
                    <div className="absolute bottom-full mb-2 left-0 bg-popover shadow-lg rounded-lg p-2 flex space-x-2">
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                            <ImageIcon className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-full"
                            onClick={() => setShowAttachmentOptions(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                )}

                <div className="flex items-center bg-accent rounded-full pl-4 pr-2 py-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full flex-shrink-0"
                        onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}>
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                        placeholder="Message..."
                        className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full flex-shrink-0">
                        <Smile className="h-5 w-5" />
                    </Button>
                    {newMessage ? (
                        <Button size="icon" className="rounded-full h-9 w-9 flex-shrink-0" onClick={handleSend}>
                            <Send className="h-5 w-5" />
                        </Button>
                    ) : (
                        <Button size="icon" className="rounded-full h-9 w-9 flex-shrink-0">
                            <ThumbsUp className="h-5 w-5" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
