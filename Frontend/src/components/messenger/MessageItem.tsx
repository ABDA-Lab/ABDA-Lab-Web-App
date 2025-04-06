import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, Paperclip, Download } from 'lucide-react';

interface MessageItemProps {
    message: {
        id: number;
        sender: {
            id: number;
            name: string;
            avatar: string;
            initials: string;
        };
        content: string;
        timestamp: string;
        status: string;
        attachment?: {
            type: string;
            url?: string;
            name?: string;
            size?: string;
        };
    };
}

export default function MessageItem({ message }: MessageItemProps) {
    const isOwnMessage = message.sender.id === 0;

    return (
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <div className="flex max-w-[70%]">
                {!isOwnMessage && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src={message.sender.avatar} />
                        <AvatarFallback>{message.sender.initials}</AvatarFallback>
                    </Avatar>
                )}

                <div>
                    <div
                        className={`
              ${
                  isOwnMessage
                      ? 'bg-primary text-primary-foreground rounded-t-lg rounded-bl-lg'
                      : 'bg-accent text-accent-foreground rounded-t-lg rounded-br-lg'
              }
              px-4 py-2
            `}>
                        {message.content}
                    </div>

                    {message.attachment && message.attachment.type === 'image' && (
                        <div className="mt-1 rounded-lg overflow-hidden">
                            <img
                                src={message.attachment.url}
                                alt="Attached image"
                                className="max-w-full h-auto max-h-60 object-cover"
                            />
                        </div>
                    )}

                    {message.attachment && message.attachment.type === 'file' && (
                        <div className="mt-1 bg-accent rounded-lg p-3 flex items-center">
                            <Paperclip className="h-5 w-5 mr-2" />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{message.attachment.name}</p>
                                <p className="text-xs text-muted-foreground">{message.attachment.size}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    )}

                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <span>{message.timestamp}</span>
                        {isOwnMessage && (
                            <div className="ml-2 flex items-center">
                                {message.status === 'sending' && <span>Sending...</span>}
                                {message.status === 'sent' && <Check className="h-3 w-3" />}
                                {message.status === 'delivered' && (
                                    <div className="flex">
                                        <Check className="h-3 w-3" />
                                        <Check className="h-3 w-3 -ml-1" />
                                    </div>
                                )}
                                {message.status === 'read' && (
                                    <div className="flex text-blue-500">
                                        <Check className="h-3 w-3" />
                                        <Check className="h-3 w-3 -ml-1" />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {isOwnMessage && (
                    <Avatar className="h-8 w-8 ml-2 mt-1">
                        <AvatarImage src={message.sender.avatar} />
                        <AvatarFallback>{message.sender.initials}</AvatarFallback>
                    </Avatar>
                )}
            </div>
        </div>
    );
}
