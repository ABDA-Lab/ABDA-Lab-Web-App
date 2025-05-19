'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Search, Plus, MoreHorizontal, Users, Bot } from 'lucide-react';
import ConversationItem from './ConversationItem';

interface ConversationSidebarProps {
    conversations: any[];
    activeConversation: any;
    setActiveConversation: (conversation: any) => void;
    onNewChat: () => void;
}

export default function ConversationSidebar({
    conversations,
    activeConversation,
    setActiveConversation,
    onNewChat,
}: ConversationSidebarProps) {
    return (
        <div className="w-100 border-r flex flex-col bg-background">
            <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Chats</h2>
                    <div className="flex gap-2">
                        {/* New Chat Button */}
                        <Button variant="outline" size="icon" onClick={onNewChat} title="New Chat">
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
                            <ConversationItem
                                key={conversation.id}
                                conversation={conversation}
                                isActive={activeConversation.id === conversation.id}
                                onClick={() => setActiveConversation(conversation)}
                            />
                        ))}
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="groups" className="flex-1 w-full mt-0 overflow-hidden">
                    <ScrollArea className="h-full">
                        {conversations
                            .filter((c) => c.isGroup)
                            .map((conversation) => (
                                <ConversationItem
                                    key={conversation.id}
                                    conversation={conversation}
                                    isActive={activeConversation.id === conversation.id}
                                    onClick={() => setActiveConversation(conversation)}
                                />
                            ))}
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="ai" className="flex-1 w-full mt-0 overflow-hidden">
                    <ScrollArea className="h-full">
                        {conversations
                            .filter((c) => c.isBot)
                            .map((conversation) => (
                                <ConversationItem
                                    key={conversation.id}
                                    conversation={conversation}
                                    isActive={activeConversation.id === conversation.id}
                                    onClick={() => setActiveConversation(conversation)}
                                />
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
    );
}
