import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

interface ConversationItemProps {
    conversation: {
        id: number;
        name: string;
        avatar: string;
        initials: string;
        lastMessage: string;
        timestamp: string;
        unread: number;
        online: boolean;
        isBot?: boolean;
    };
    isActive: boolean;
    onClick: () => void;
}

export default function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center p-3 cursor-pointer hover:bg-accent rounded-md mx-2 my-1 ${
                isActive ? 'bg-accent' : ''
            }`}>
            <div className="relative">
                <Avatar>
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>{conversation.initials}</AvatarFallback>
                </Avatar>
                {conversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                )}
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                    <p className="font-medium truncate">
                        {conversation.name}
                        {conversation.isBot && <Bot className="h-3 w-3 inline ml-1 text-blue-500" />}
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{conversation.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
            </div>
            {conversation.unread > 0 && (
                <div className="rounded-full bg-primary text-primary-foreground h-5 min-w-5 flex items-center justify-center ml-2 text-xs">
                    {conversation.unread}
                </div>
            )}
        </div>
    );
}
