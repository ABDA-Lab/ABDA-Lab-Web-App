'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarCard() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
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
    );
}
