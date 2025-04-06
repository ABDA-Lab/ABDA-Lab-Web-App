'use client';

import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageItem from './MessageItem';

interface MessageListProps {
    messages: any[];
}

export default function MessageList({ messages }: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <ScrollArea className="flex-1">
            <div className="flex flex-col space-y-4 p-4">
                {messages.map((message) => (
                    <MessageItem key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
    );
}
