'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import {
    Search,
    Send,
    Paperclip,
    Image as ImageIcon,
    Smile,
    MoreHorizontal,
    Phone,
    Video,
    Bot,
    Users,
    UserCircle2,
    Check,
    ThumbsUp,
    X,
    Download,
    Plus,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Mock data for chats
const conversations = [
    {
        id: 1,
        name: 'Anh Nguyen',
        avatar: '/avatars/anhnguyen.png',
        initials: 'AN',
        lastMessage: 'Do you have the dataset ready?',
        timestamp: '10:30 AM',
        unread: 2,
        online: true,
    },
    {
        id: 2,
        name: 'Binh Tran',
        avatar: '/avatars/binhtran.png',
        initials: 'BT',
        lastMessage: "I've updated the model architecture",
        timestamp: 'Yesterday',
        unread: 0,
        online: true,
    },
    {
        id: 3,
        name: 'AI Research Team',
        avatar: '',
        initials: 'AI',
        lastMessage: 'Cong: Meeting tomorrow at 10 AM?',
        timestamp: 'Yesterday',
        unread: 0,
        online: false,
        isGroup: true,
    },
    {
        id: 4,
        name: 'ABDA Lab Assistant',
        avatar: '/avatars/ai-bot.png',
        initials: 'AI',
        lastMessage: 'I can help you with that research',
        timestamp: 'Tuesday',
        unread: 0,
        online: true,
        isBot: true,
    },
    {
        id: 5,
        name: 'Cong Le',
        avatar: '/avatars/congle.png',
        initials: 'CL',
        lastMessage: 'Thanks for sending the report',
        timestamp: 'Monday',
        unread: 0,
        online: false,
    },
];

// Mock data for current conversation messages
const currentMessages = [
    {
        id: 1,
        sender: {
            id: 2,
            name: 'Binh Tran',
            avatar: '/avatars/binhtran.png',
            initials: 'BT',
        },
        content: 'Hi, have you reviewed the latest model results?',
        timestamp: '10:15 AM',
        status: 'read',
    },
    {
        id: 2,
        sender: {
            id: 0, // current user
            name: 'You',
            avatar: '/avatars/you.png',
            initials: 'YO',
        },
        content: "Yes, the accuracy improved by 5%. I think we're making good progress!",
        timestamp: '10:18 AM',
        status: 'read',
    },
    {
        id: 3,
        sender: {
            id: 2,
            name: 'Binh Tran',
            avatar: '/avatars/binhtran.png',
            initials: 'BT',
        },
        content:
            "Great! I've updated the model architecture with the new layers we discussed yesterday. Could you take a look?",
        timestamp: '10:20 AM',
        status: 'read',
    },
    {
        id: 4,
        sender: {
            id: 2,
            name: 'Binh Tran',
            avatar: '/avatars/binhtran.png',
            initials: 'BT',
        },
        content: "Here's the updated diagram:",
        timestamp: '10:21 AM',
        status: 'read',
        attachment: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=2070&auto=format&fit=crop',
        },
    },
    {
        id: 5,
        sender: {
            id: 0,
            name: 'You',
            avatar: '/avatars/you.png',
            initials: 'YO',
        },
        content: "This looks promising! I'll implement these changes this afternoon.",
        timestamp: '10:25 AM',
        status: 'delivered',
    },
    {
        id: 6,
        sender: {
            id: 0,
            name: 'You',
            avatar: '/avatars/you.png',
            initials: 'YO',
        },
        content: 'Also, I found this paper that might be relevant to our approach.',
        timestamp: '10:26 AM',
        status: 'sent',
        attachment: {
            type: 'file',
            name: 'deep_learning_approach.pdf',
            size: '2.4 MB',
        },
    },
];
const labMembers = [
    {
        id: 101,
        name: 'Minh Nguyen',
        avatar: '/avatars/minhnguyen.png',
        initials: 'MN',
        role: 'Research Lead',
        online: true,
    },
    {
        id: 102,
        name: 'Huong Tran',
        avatar: '/avatars/huongtran.png',
        initials: 'HT',
        role: 'Data Scientist',
        online: false,
    },
    {
        id: 103,
        name: 'Duong Pham',
        avatar: '/avatars/duongpham.png',
        initials: 'DP',
        role: 'ML Engineer',
        online: true,
    },
    { id: 104, name: 'Linh Le', avatar: '/avatars/linhle.png', initials: 'LL', role: 'PhD Student', online: true },
    {
        id: 105,
        name: 'Tuan Vo',
        avatar: '/avatars/tuanvo.png',
        initials: 'TV',
        role: 'Research Assistant',
        online: false,
    },
    {
        id: 106,
        name: 'Nam Hoang',
        avatar: '/avatars/namhoang.png',
        initials: 'NH',
        role: 'Lab Coordinator',
        online: true,
    },
    // Add more lab members as needed
].sort((a, b) => a.name.localeCompare(b.name));

export default function Messenger() {
    const [activeConversation, setActiveConversation] = useState(conversations[1]);
    const [messages, setMessages] = useState(currentMessages);
    const [newMessage, setNewMessage] = useState('');
    const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(labMembers);

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults(labMembers);
        } else {
            const filteredMembers = labMembers.filter((member) =>
                member.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filteredMembers);
        }
    }, [searchTerm]);

    // Create new conversation
    // Create new conversation
    const startNewConversation = (member: { id?: number; name: any; avatar: any; initials: any; role?: string; online: any; }) => {
        // Check if a conversation already exists with this member
        const existingConversation = conversations.find((c) => c.name === member.name);

        if (existingConversation) {
            // If conversation exists, just activate it
            setActiveConversation(existingConversation);
        } else {
            // Create a new conversation and add it to the list
            const newConv = {
                id: conversations.length + 1,
                name: member.name,
                avatar: member.avatar,
                initials: member.initials,
                lastMessage: 'Start a conversation...',
                timestamp: 'Now',
                unread: 0,
                online: member.online,
            };

            // In a real app, you would update this in your database
            // For demo purposes, we'll just update the state
            // conversations.unshift(newConv); // Add to beginning of array
            setActiveConversation(newConv);
        }

        setIsNewChatModalOpen(false);
    };

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const newMsg = {
            id: messages.length + 1,
            sender: {
                id: 0,
                name: 'You',
                avatar: '/avatars/you.png',
                initials: 'YO',
            },
            content: newMessage,
            timestamp: 'Just now',
            status: 'sending',
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');

        // Simulate message status updates
        setTimeout(() => {
            setMessages((prev) => prev.map((msg) => (msg.id === newMsg.id ? { ...msg, status: 'sent' } : msg)));

            setTimeout(() => {
                setMessages((prev) =>
                    prev.map((msg) => (msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg))
                );
            }, 1000);
        }, 500);
    };

    const handleKeyDown = (e: { key: string; shiftKey: any; preventDefault: () => void }) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex h-[calc(100vh-80px)] w-full overflow-hidden">
            {/* Conversation Sidebar */}
            <div className="w-100 border-r flex flex-col bg-background">
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Chats</h2>
                        <div className="flex gap-2">
                            {/* New Chat Button */}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setIsNewChatModalOpen(true)}
                                title="New Chat">
                                <Plus className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search conversations" className="pl-8" />
                    </div>
                </div>

                <Tabs defaultValue="all" className="flex flex-col flex-1">
                    <div className="px-4 pt-2 shrink-0">
                        <TabsList className="w-full">
                            <TabsTrigger value="all" className="flex-1">
                                <Users className="h-4 w-4 mr-2" />
                                Chats
                            </TabsTrigger>
                            <TabsTrigger value="groups" className="flex-1">
                                <Users className="h-4 w-4 mr-2" />
                                Groups
                            </TabsTrigger>
                            <TabsTrigger value="ai" className="flex-1">
                                <Bot className="h-4 w-4 mr-2" />
                                AI
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="all" className="flex-1 w-full mt-0 overflow-hidden">
                        <ScrollArea className="h-full">
                            {conversations.map((conversation) => (
                                <div
                                    key={conversation.id}
                                    onClick={() => setActiveConversation(conversation)}
                                    className={`flex items-center p-3 cursor-pointer hover:bg-accent rounded-md mx-2 my-1 ${
                                        activeConversation.id === conversation.id ? 'bg-accent' : ''
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
                                                {conversation.isBot && (
                                                    <Bot className="h-3 w-3 inline ml-1 text-blue-500" />
                                                )}
                                            </p>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {conversation.timestamp}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {conversation.lastMessage}
                                        </p>
                                    </div>
                                    {conversation.unread > 0 && (
                                        <div className="rounded-full bg-primary text-primary-foreground h-5 min-w-5 flex items-center justify-center ml-2 text-xs">
                                            {conversation.unread}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="groups" className="flex-1 w-full mt-0 overflow-hidden">
                        <ScrollArea className="h-full">
                            {conversations
                                .filter((c) => c.isGroup)
                                .map((conversation) => (
                                    <div
                                        key={conversation.id}
                                        onClick={() => setActiveConversation(conversation)}
                                        className={`flex items-center p-3 cursor-pointer hover:bg-accent rounded-md mx-2 my-1 ${
                                            activeConversation.id === conversation.id ? 'bg-accent' : ''
                                        }`}>
                                        <Avatar>
                                            <AvatarFallback>{conversation.initials}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-3 flex-1 overflow-hidden">
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium truncate">{conversation.name}</p>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                    {conversation.timestamp}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {conversation.lastMessage}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="ai" className="flex-1 w-full mt-0 overflow-hidden">
                        <ScrollArea className="h-full">
                            {conversations
                                .filter((c) => c.isBot)
                                .map((conversation) => (
                                    <div
                                        key={conversation.id}
                                        onClick={() => setActiveConversation(conversation)}
                                        className={`flex items-center p-3 cursor-pointer hover:bg-accent rounded-md mx-2 my-1 ${
                                            activeConversation.id === conversation.id ? 'bg-accent' : ''
                                        }`}>
                                        <Avatar>
                                            <AvatarImage src={conversation.avatar} />
                                            <AvatarFallback>{conversation.initials}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-3 flex-1 overflow-hidden">
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium truncate">
                                                    {conversation.name}
                                                    <Bot className="h-3 w-3 inline ml-1 text-blue-500" />
                                                </p>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                    {conversation.timestamp}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {conversation.lastMessage}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            <div className="p-4">
                                <Card className="p-4 bg-blue-50">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Avatar className="h-10 w-10 bg-blue-500">
                                            <Bot className="h-6 w-6 text-white" />
                                            <AvatarFallback>AI</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-medium">ABDA Lab Assistant</h3>
                                            <p className="text-xs text-muted-foreground">Powered by AI</p>
                                        </div>
                                    </div>
                                    <p className="text-sm">
                                        Ask me about research papers, help with code, or lab resources!
                                    </p>
                                    <Button
                                        className="mt-3 w-full"
                                        variant="default"
                                        size="sm"
                                        onClick={() => {
                                            const botConversation = conversations.find((c) => c.isBot);
                                            if (botConversation) {
                                                setActiveConversation(botConversation);
                                            }
                                        }}>
                                        Start a conversation
                                    </Button>
                                </Card>
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Chat Header */}
                <div className="border-b p-4 flex justify-between items-center bg-background shrink-0">
                    <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={activeConversation.avatar} />
                            <AvatarFallback>{activeConversation.initials}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                            <div className="font-medium flex items-center">
                                {activeConversation.name}
                                {activeConversation.isBot && <Bot className="h-4 w-4 ml-1 text-blue-500" />}
                            </div>
                            {activeConversation.online ? (
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

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                    <div className="flex flex-col space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender.id === 0 ? 'justify-end' : 'justify-start'}`}>
                                <div className="flex max-w-[70%]">
                                    {message.sender.id !== 0 && (
                                        <Avatar className="h-8 w-8 mr-2 mt-1">
                                            <AvatarImage src={message.sender.avatar} />
                                            <AvatarFallback>{message.sender.initials}</AvatarFallback>
                                        </Avatar>
                                    )}

                                    <div>
                                        <div
                                            className={`
                        ${
                            message.sender.id === 0
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
                                                    <p className="font-medium text-sm truncate">
                                                        {message.attachment.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {message.attachment.size}
                                                    </p>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}

                                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                            <span>{message.timestamp}</span>
                                            {message.sender.id === 0 && (
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

                                    {message.sender.id === 0 && (
                                        <Avatar className="h-8 w-8 ml-2 mt-1">
                                            <AvatarImage src={message.sender.avatar} />
                                            <AvatarFallback>{message.sender.initials}</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                {/* Message Input */}
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
                                <Button
                                    size="icon"
                                    className="rounded-full h-9 w-9 flex-shrink-0"
                                    onClick={sendMessage}>
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
            </div>

            <Dialog open={isNewChatModalOpen} onOpenChange={setIsNewChatModalOpen}>
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
                                        onClick={() => startNewConversation(member)}
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
        </div>
    );
}
