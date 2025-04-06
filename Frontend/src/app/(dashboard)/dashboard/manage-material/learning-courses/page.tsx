'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    PlayCircle,
    PauseCircle,
    SkipForward,
    SkipBack,
    Volume2,
    VolumeX,
    Settings,
    Maximize,
    CheckCircle,
    BookOpen,
    FileText,
    MessageSquare,
    Download,
} from 'lucide-react';
import { LearningTabs } from '@/components/learning/tabs/LearningTabs';
import { VideoPlayer } from '@/components/learning/VideoPlayer';
import { CourseSidebar } from '@/components/learning/CourseSidebar';
import { CourseHeader } from '@/components/learning/CourseHeader';

// Mock course data
const courseMockData = {
    title: 'Machine Learning Fundamentals',
    instructor: 'Dr. Jane Smith',
    totalLessons: 12,
    completedLessons: 5,
    currentModule: 'Module 2: Supervised Learning',
    progress: 42,
    modules: [
        {
            id: 1,
            title: 'Introduction to Machine Learning',
            lessons: [
                { id: '1.1', title: 'What is Machine Learning?', duration: '10:23', completed: true },
                { id: '1.2', title: 'Types of Machine Learning', duration: '15:45', completed: true },
                { id: '1.3', title: 'Setting up Your Environment', duration: '12:10', completed: true },
            ],
        },
        {
            id: 2,
            title: 'Supervised Learning',
            lessons: [
                { id: '2.1', title: 'Linear Regression', duration: '18:30', completed: true },
                { id: '2.2', title: 'Logistic Regression', duration: '14:15', completed: true },
                { id: '2.3', title: 'Decision Trees', duration: '20:45', completed: false, current: true },
                { id: '2.4', title: 'Support Vector Machines', duration: '16:20', completed: false },
            ],
        },
        {
            id: 3,
            title: 'Unsupervised Learning',
            lessons: [
                { id: '3.1', title: 'Clustering Methods', duration: '17:50', completed: false },
                { id: '3.2', title: 'Dimensionality Reduction', duration: '19:10', completed: false },
                { id: '3.3', title: 'Principal Component Analysis', duration: '22:05', completed: false },
            ],
        },
        {
            id: 4,
            title: 'Neural Networks & Deep Learning',
            lessons: [
                { id: '4.1', title: 'Introduction to Neural Networks', duration: '20:30', completed: false },
                { id: '4.2', title: 'Building Your First Neural Network', duration: '25:15', completed: false },
            ],
        },
    ],
    resources: [
        { title: 'Course Syllabus', type: 'PDF' },
        { title: 'Decision Trees Cheat Sheet', type: 'PDF' },
        { title: 'Python Code Examples', type: 'ZIP' },
        { title: 'Dataset for Exercises', type: 'CSV' },
    ],
    notes: [
        { timestamp: '05:23', text: 'Key concept: Information gain measures how well a feature separates the data' },
        { timestamp: '12:45', text: 'Remember to use pruning to avoid overfitting' },
    ],
    discussions: [
        { user: 'AlexT', text: 'How do you determine the optimal depth for a decision tree?', replies: 3 },
        { user: 'Maya22', text: 'Great explanation of Gini impurity vs. entropy!', replies: 1 },
    ],
};

export default function LearningCoursesPage() {
    const currentLesson = courseMockData.modules.flatMap((module) => module.lessons).find((lesson) => lesson.current);

    const addNote = (text: string) => {
        console.log('Adding note:', text);
    };

    // Handler for selecting lessons
    const handleSelectLesson = (moduleId: number, lessonId: string) => {
        console.log(`Selected lesson ${lessonId} from module ${moduleId}`);
    };

    return (
        <div className="container mx-auto p-4 space-y-6">
            <CourseHeader
                title={courseMockData.title}
                instructor={courseMockData.instructor}
                completedLessons={courseMockData.completedLessons}
                totalLessons={courseMockData.totalLessons}
                progress={courseMockData.progress}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="col-span-1 lg:col-span-2 space-y-4">
                    <VideoPlayer
                        title={currentLesson?.title || 'Select a lesson'}
                        duration={currentLesson?.duration || '00:00'}
                    />

                    <LearningTabs
                        currentLesson={currentLesson}
                        currentModule={courseMockData.currentModule}
                        resources={courseMockData.resources}
                        notes={courseMockData.notes}
                        discussions={courseMockData.discussions}
                        onAddNote={addNote}
                    />
                </div>

                <div className="col-span-1">
                    <CourseSidebar
                        modules={courseMockData.modules}
                        completedLessons={courseMockData.completedLessons}
                        totalLessons={courseMockData.totalLessons}
                        onSelectLesson={handleSelectLesson}
                    />
                </div>
            </div>
        </div>
    );
}
