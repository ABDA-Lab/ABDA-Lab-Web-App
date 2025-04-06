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
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(80);
    const [isMuted, setIsMuted] = useState(false);
    const [noteText, setNoteText] = useState('');

    // Mock function to toggle play/pause
    const togglePlayback = () => setIsPlaying(!isPlaying);

    // Mock function to add a note
    const addNote = () => {
        if (noteText.trim()) {
            console.log('Adding note:', noteText);
            setNoteText('');
        }
    };

    // Find current lesson
    const currentLesson = courseMockData.modules.flatMap((module) => module.lessons).find((lesson) => lesson.current);

    return (
        <div className="container mx-auto p-4 space-y-6">
            {/* Course header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold">{courseMockData.title}</h1>
                    <p className="text-muted-foreground">Instructor: {courseMockData.instructor}</p>
                </div>
                <div className="flex flex-col w-full md:w-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">
                            Your progress: {courseMockData.completedLessons}/{courseMockData.totalLessons} lessons
                        </span>
                        <span className="text-sm text-muted-foreground">({courseMockData.progress}%)</span>
                    </div>
                    <Progress value={courseMockData.progress} className="w-full md:w-[250px]" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Video player section */}
                <div className="col-span-1 lg:col-span-2 space-y-4">
                    {/* Video player */}
                    <Card>
                        <CardContent className="p-0 relative bg-black aspect-video flex items-center justify-center overflow-hidden">
                            <div className="text-white text-opacity-30 text-sm absolute top-4 left-4">
                                {currentLesson?.title || 'Loading video...'}
                            </div>

                            {/* Placeholder for video (in a real app, this would be a video element) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-white text-opacity-50 text-lg">
                                    {isPlaying ? 'Playing video...' : 'Video paused'}
                                </div>
                            </div>

                            {/* Video controls overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                <div className="flex flex-col gap-2">
                                    {/* Progress bar */}
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={currentTime}
                                        onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                                        className="w-full h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer"
                                    />

                                    <div className="flex justify-between items-center">
                                        {/* Left controls */}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={togglePlayback}
                                                className="text-white hover:bg-white/10">
                                                {isPlaying ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-white hover:bg-white/10">
                                                <SkipBack size={20} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-white hover:bg-white/10">
                                                <SkipForward size={20} />
                                            </Button>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setIsMuted(!isMuted)}
                                                    className="text-white hover:bg-white/10">
                                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                                </Button>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={isMuted ? 0 : volume}
                                                    onChange={(e) => setVolume(parseInt(e.target.value))}
                                                    className="w-16 h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer"
                                                />
                                            </div>
                                            <span className="text-white text-xs">10:23 / 20:45</span>
                                        </div>

                                        {/* Right controls */}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-white hover:bg-white/10">
                                                <Settings size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-white hover:bg-white/10">
                                                <Maximize size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs for content below video */}
                    <Tabs defaultValue="about" className="w-full">
                        <TabsList className="grid grid-cols-4 mb-4">
                            <TabsTrigger value="about">About</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                            <TabsTrigger value="notes">Notes</TabsTrigger>
                            <TabsTrigger value="discussion">Discussion</TabsTrigger>
                        </TabsList>

                        <TabsContent value="about" className="space-y-4">
                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="text-xl font-medium mb-2">
                                        {currentLesson?.title || 'Lesson title'}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Part of: {courseMockData.currentModule}
                                    </p>
                                    <p>
                                        This lesson covers the fundamentals of decision trees in machine learning. You
                                        will learn about how decision trees work, their advantages and limitations, and
                                        how to implement them for classification and regression tasks.
                                    </p>
                                    <div className="mt-4">
                                        <h4 className="font-medium mb-2">What you will learn:</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Decision tree algorithms (ID3, C4.5, CART)</li>
                                            <li>Information gain and Gini impurity</li>
                                            <li>Tree pruning techniques</li>
                                            <li>Implementing decision trees in Python using scikit-learn</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="resources">
                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="font-medium mb-4">Learning Materials</h3>
                                    <div className="space-y-3">
                                        {courseMockData.resources.map((resource, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-2 bg-muted rounded-md">
                                                <div className="flex items-center gap-2">
                                                    <FileText size={16} />
                                                    <span>{resource.title}</span>
                                                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                                                        {resource.type}
                                                    </span>
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    <Download size={16} />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="notes">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Input
                                            placeholder="Add a note for this timestamp..."
                                            value={noteText}
                                            onChange={(e) => setNoteText(e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button onClick={addNote}>Add Note</Button>
                                    </div>

                                    <div className="space-y-3">
                                        {courseMockData.notes.map((note, index) => (
                                            <div key={index} className="bg-muted p-3 rounded-md">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded">
                                                        {note.timestamp}
                                                    </span>
                                                    <Button variant="ghost" size="sm" className="h-6 px-2">
                                                        Edit
                                                    </Button>
                                                </div>
                                                <p className="text-sm">{note.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="discussion">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-medium">Discussion (4 comments)</h3>
                                        <Button variant="outline">New Question</Button>
                                    </div>

                                    <Textarea placeholder="Join the discussion about this lesson..." className="mb-4" />

                                    <div className="space-y-4">
                                        {courseMockData.discussions.map((discussion, index) => (
                                            <div key={index} className="p-3 border rounded-md">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-medium">{discussion.user}</span>
                                                    <span className="text-xs text-muted-foreground">2 days ago</span>
                                                </div>
                                                <p className="text-sm mb-2">{discussion.text}</p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Button variant="ghost" size="sm" className="h-6 px-2">
                                                        Reply
                                                    </Button>
                                                    <span>{discussion.replies} replies</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Course navigation sidebar */}
                <div className="col-span-1">
                    <Card className="h-full">
                        <CardContent className="p-0">
                            <div className="p-4 border-b">
                                <h2 className="font-semibold">Course Content</h2>
                                <p className="text-sm text-muted-foreground">
                                    {courseMockData.completedLessons} of {courseMockData.totalLessons} lessons completed
                                </p>
                            </div>

                            <ScrollArea className="h-[600px] py-2">
                                {courseMockData.modules.map((module) => (
                                    <div key={module.id} className="mb-4">
                                        <div className="px-4 py-2 font-medium">{module.title}</div>

                                        <div className="space-y-1">
                                            {module.lessons.map((lesson) => (
                                                <div
                                                    key={lesson.id}
                                                    className={`px-4 py-2 flex items-center gap-2 hover:bg-muted cursor-pointer ${
                                                        lesson.current ? 'bg-muted' : ''
                                                    }`}>
                                                    <div className="flex-shrink-0">
                                                        {lesson.completed ? (
                                                            <CheckCircle size={16} className="text-primary" />
                                                        ) : (
                                                            <PlayCircle size={16} className="text-muted-foreground" />
                                                        )}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between text-sm">
                                                            <span
                                                                className={`truncate ${
                                                                    lesson.current ? 'font-medium' : ''
                                                                }`}>
                                                                {lesson.title}
                                                            </span>
                                                            <span className="text-xs text-muted-foreground flex-shrink-0">
                                                                {lesson.duration}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
