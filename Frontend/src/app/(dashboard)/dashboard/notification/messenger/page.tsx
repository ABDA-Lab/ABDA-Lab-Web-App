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
import ConversationSidebar from '@/components/messenger/ConversationSidebar';
import ChatHeader from '@/components/messenger/ChatHeader';
import MessageList from '@/components/messenger/MessageList';
import MessageInput from '@/components/messenger/MessageInput';
import NewChatModal from '@/components/messenger/NewChatModal';

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
    const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

    const sendMessage = (newMessageText: string) => {
        const newMsg = {
            id: messages.length + 1,
            sender: {
                id: 0,
                name: 'You',
                avatar: '/avatars/you.png',
                initials: 'YO',
            },
            content: newMessageText,
            timestamp: 'Just now',
            status: 'sending',
        };

        setMessages([...messages, newMsg]);

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

    // Create new conversation
    const startNewConversation = (member: {
        id?: number;
        name: any;
        avatar: any;
        initials: any;
        role?: string;
        online: any;
    }) => {
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
            setActiveConversation(newConv);
        }
    };

    return (
        <div className="flex h-[calc(100vh-80px)] w-full overflow-hidden">
            {/* Conversation Sidebar */}
            <ConversationSidebar
                conversations={conversations}
                activeConversation={activeConversation}
                setActiveConversation={setActiveConversation}
                onNewChat={() => setIsNewChatModalOpen(true)}
            />

            {/* Chat Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <ChatHeader conversation={activeConversation} />
                <MessageList messages={messages} />
                <MessageInput onSendMessage={sendMessage} />
            </div>

            {/* New Chat Modal */}
            <NewChatModal
                isOpen={isNewChatModalOpen}
                onClose={() => setIsNewChatModalOpen(false)}
                onSelectMember={startNewConversation}
                labMembers={labMembers}
            />
        </div>
    );
}
