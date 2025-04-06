import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, Video, UserCircle2, Bot } from 'lucide-react';

interface ChatHeaderProps {
    conversation: {
        name: string;
        avatar: string;
        initials: string;
        online: boolean;
        isBot?: boolean;
    };
}

export default function ChatHeader({ conversation }: ChatHeaderProps) {
    return (
        <div className="border-b p-4 flex justify-between items-center bg-background shrink-0">
            <div className="flex items-center">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>{conversation.initials}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                    <div className="font-medium flex items-center">
                        {conversation.name}
                        {conversation.isBot && <Bot className="h-4 w-4 ml-1 text-blue-500" />}
                    </div>
                    {conversation.online ? (
                        <div className="text-xs text-muted-foreground flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                            Active now
                        </div>
                    ) : (
                        <div className="text-xs text-muted-foreground">Last active 2h ago</div>
                    )}
                </div>
            </div>

            <div className="flex">
                <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <UserCircle2 className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
