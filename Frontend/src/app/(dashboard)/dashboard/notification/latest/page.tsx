'use client';

import CalendarCard from "@/components/notification/CalendarCard";
import DeadlinesCard from "@/components/notification/DeadlinesCard";
import NotificationsCard from "@/components/notification/NotificationsCard";


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
const notifications: { id: number; type: "system" | "project" | "message"; title: string; message: string; date: string; read: boolean; }[] = [
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
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Notification Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Calendar and Deadlines Section */}
                <div className="md:col-span-1 space-y-6">
                    <CalendarCard />
                    <DeadlinesCard deadlines={upcomingDeadlines} />
                </div>

                {/* Notifications Section */}
                <div className="md:col-span-2">
                    <NotificationsCard notifications={notifications} />
                </div>
            </div>
        </div>
    );
}
