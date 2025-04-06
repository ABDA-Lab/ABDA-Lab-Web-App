'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar as CalendarIcon, Clock, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for upcoming deadlines
const upcomingDeadlines = [
    {
        id: 1,
        title: 'Submit AI Image Recognition Report',
        project: 'AI Image Recognition',
        date: '2025-04-10',
        priority: 'high',
    },
    {
        id: 2,
        title: 'Quarterly Team Meeting',
        project: 'Lab Administration',
        date: '2025-04-15',
        priority: 'medium',
    },
    {
        id: 3,
        title: 'Complete Data Collection',
        project: 'NLP Research',
        date: '2025-04-20',
        priority: 'medium',
    },
    {
        id: 4,
        title: 'Framework Documentation Deadline',
        project: 'Deep Learning Framework',
        date: '2025-04-28',
        priority: 'high',
    },
];

// Mock data for notifications
const notifications = [
    {
        id: 1,
        type: 'system',
        title: 'System Maintenance',
        message: 'The lab server will undergo maintenance on April 10, 2025, from 10 PM to 2 AM.',
        date: '2025-04-05T09:30:00',
        read: false,
    },
    {
        id: 2,
        type: 'project',
        title: 'Project Update: AI Image Recognition',
        message: 'Anh Nguyen has completed the Algorithm Design task.',
        date: '2025-04-04T14:20:00',
        read: true,
    },
    {
        id: 3,
        type: 'message',
        title: 'New Message from Binh Tran',
        message: 'Please review the latest dataset for the image recognition project.',
        date: '2025-04-04T11:45:00',
        read: false,
    },
    {
        id: 4,
        type: 'system',
        title: 'New Publication Guidelines',
        message: 'Updated guidelines for submitting conference papers are now available.',
        date: '2025-04-03T16:10:00',
        read: true,
    },
    {
        id: 5,
        type: 'project',
        title: 'Task Assignment: NLP Research',
        message: 'You have been assigned to the Tokenizer Development task.',
        date: '2025-04-02T10:15:00',
        read: true,
    },
];

export default function LatestNotification() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    // Function to calculate days remaining
    const daysRemaining = (deadlineDate: string) => {
        const today = new Date();
        const deadline = new Date(deadlineDate);
        const diffTime = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Function to format notification time
    const formatNotificationTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-500 hover:bg-red-600';
            case 'medium':
                return 'bg-amber-500 hover:bg-amber-600';
            case 'low':
                return 'bg-green-500 hover:bg-green-600';
            default:
                return 'bg-gray-500 hover:bg-gray-600';
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'system':
                return <Bell className="h-5 w-5 text-blue-500" />;
            case 'project':
                return <FileText className="h-5 w-5 text-green-500" />;
            case 'message':
                return <Bell className="h-5 w-5 text-purple-500" />;
            default:
                return <Bell className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Notification Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Calendar and Deadlines Section */}
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CalendarIcon className="h-5 w-5 mr-2" /> Calendar
                            </CardTitle>
                            <CardDescription>Current month and important dates</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Clock className="h-5 w-5 mr-2" /> Upcoming Deadlines
                            </CardTitle>
                            <CardDescription>Tasks and deadlines approaching soon</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingDeadlines.map((deadline) => {
                                    const days = daysRemaining(deadline.date);
                                    return (
                                        <div
                                            key={deadline.id}
                                            className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                                            <div>
                                                <p className="font-medium">{deadline.title}</p>
                                                <p className="text-sm text-muted-foreground">{deadline.project}</p>
                                                <p className="text-sm mt-1">
                                                    {new Date(deadline.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                            <Badge className={`${getPriorityColor(deadline.priority)} text-white`}>
                                                {days} days
                                            </Badge>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Notifications Section */}
                <div className="md:col-span-2">
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
                                        <div
                                            key={notification.id}
                                            className={`p-4 border rounded-lg transition-colors ${
                                                notification.read ? 'bg-white' : 'bg-blue-50'
                                            }`}>
                                            <div className="flex">
                                                <div className="mr-4 mt-1">
                                                    {getNotificationIcon(notification.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <h3 className="font-medium">{notification.title}</h3>
                                                        <span className="text-xs text-gray-500">
                                                            {formatNotificationTime(notification.date)}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </TabsContent>

                                <TabsContent value="unread" className="space-y-4">
                                    {notifications
                                        .filter((n) => !n.read)
                                        .map((notification) => (
                                            <div key={notification.id} className="p-4 border rounded-lg bg-blue-50">
                                                <div className="flex">
                                                    <div className="mr-4 mt-1">
                                                        {getNotificationIcon(notification.type)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between">
                                                            <h3 className="font-medium">{notification.title}</h3>
                                                            <span className="text-xs text-gray-500">
                                                                {formatNotificationTime(notification.date)}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-600 text-sm mt-1">
                                                            {notification.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </TabsContent>

                                <TabsContent value="system" className="space-y-4">
                                    {notifications
                                        .filter((n) => n.type === 'system')
                                        .map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 border rounded-lg transition-colors ${
                                                    notification.read ? 'bg-white' : 'bg-blue-50'
                                                }`}>
                                                <div className="flex">
                                                    <div className="mr-4 mt-1">
                                                        {getNotificationIcon(notification.type)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between">
                                                            <h3 className="font-medium">{notification.title}</h3>
                                                            <span className="text-xs text-gray-500">
                                                                {formatNotificationTime(notification.date)}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-600 text-sm mt-1">
                                                            {notification.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </TabsContent>

                                <TabsContent value="project" className="space-y-4">
                                    {notifications
                                        .filter((n) => n.type === 'project')
                                        .map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 border rounded-lg transition-colors ${
                                                    notification.read ? 'bg-white' : 'bg-blue-50'
                                                }`}>
                                                <div className="flex">
                                                    <div className="mr-4 mt-1">
                                                        {getNotificationIcon(notification.type)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between">
                                                            <h3 className="font-medium">{notification.title}</h3>
                                                            <span className="text-xs text-gray-500">
                                                                {formatNotificationTime(notification.date)}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-600 text-sm mt-1">
                                                            {notification.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
