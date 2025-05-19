import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, PlayCircle } from 'lucide-react';

interface Lesson {
    id: string;
    title: string;
    duration: string;
    completed?: boolean;
    current?: boolean;
}

interface Module {
    id: number;
    title: string;
    lessons: Lesson[];
}

interface CourseSidebarProps {
    modules: Module[];
    completedLessons: number;
    totalLessons: number;
    onSelectLesson?: (moduleId: number, lessonId: string) => void;
}

export function CourseSidebar({ modules, completedLessons, totalLessons, onSelectLesson }: CourseSidebarProps) {
    return (
        <Card className="h-full">
            <CardContent className="p-0">
                <div className="p-4 border-b">
                    <h2 className="font-semibold">Course Content</h2>
                    <p className="text-sm text-muted-foreground">
                        {completedLessons} of {totalLessons} lessons completed
                    </p>
                </div>

                <ScrollArea className="h-[600px] py-2">
                    {modules.map((module) => (
                        <div key={module.id} className="mb-4">
                            <div className="px-4 py-2 font-medium">{module.title}</div>

                            <div className="space-y-1">
                                {module.lessons.map((lesson) => (
                                    <div
                                        key={lesson.id}
                                        className={`px-4 py-2 flex items-center gap-2 hover:bg-muted cursor-pointer ${
                                            lesson.current ? 'bg-muted' : ''
                                        }`}
                                        onClick={() => onSelectLesson && onSelectLesson(module.id, lesson.id)}>
                                        <div className="flex-shrink-0">
                                            {lesson.completed ? (
                                                <CheckCircle size={16} className="text-primary" />
                                            ) : (
                                                <PlayCircle size={16} className="text-muted-foreground" />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between text-sm">
                                                <span className={`truncate ${lesson.current ? 'font-medium' : ''}`}>
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
    );
}
