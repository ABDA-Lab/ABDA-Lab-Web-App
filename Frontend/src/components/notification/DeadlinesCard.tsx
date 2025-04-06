'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

type Deadline = {
    id: number;
    title: string;
    project: string;
    date: string;
    priority: string;
};

interface DeadlinesCardProps {
    deadlines: Deadline[];
}

export default function DeadlinesCard({ deadlines }: DeadlinesCardProps) {
    // Function to calculate days remaining
    const daysRemaining = (deadlineDate: string) => {
        const today = new Date();
        const deadline = new Date(deadlineDate);
        const diffTime = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
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

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" /> Upcoming Deadlines
                </CardTitle>
                <CardDescription>Tasks and deadlines approaching soon</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {deadlines.map((deadline) => {
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
    );
}
