'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationItem from './NotificationItem';

type Notification = {
    id: number;
    type: 'system' | 'project' | 'message';
    title: string;
    message: string;
    date: string;
    read: boolean;
};

interface NotificationsCardProps {
    notifications: Notification[];
}

export default function NotificationsCard({ notifications }: NotificationsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Latest Notifications</CardTitle>
                <CardDescription>Recent updates and messages</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="unread">Unread</TabsTrigger>
                        <TabsTrigger value="system">System</TabsTrigger>
                        <TabsTrigger value="project">Projects</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        {notifications.map((notification) => (
                            <NotificationItem key={notification.id} {...notification} />
                        ))}
                    </TabsContent>

                    <TabsContent value="unread" className="space-y-4">
                        {notifications
                            .filter((n) => !n.read)
                            .map((notification) => (
                                <NotificationItem key={notification.id} {...notification} />
                            ))}
                    </TabsContent>

                    <TabsContent value="system" className="space-y-4">
                        {notifications
                            .filter((n) => n.type === 'system')
                            .map((notification) => (
                                <NotificationItem key={notification.id} {...notification} />
                            ))}
                    </TabsContent>

                    <TabsContent value="project" className="space-y-4">
                        {notifications
                            .filter((n) => n.type === 'project')
                            .map((notification) => (
                                <NotificationItem key={notification.id} {...notification} />
                            ))}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
