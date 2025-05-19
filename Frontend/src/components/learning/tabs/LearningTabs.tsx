import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscussionTab } from './DiscussionTab';
import { ResourcesTab } from './ResourcesTab';
import { NotesTab } from './NotesTab';
import { AboutTab } from './AboutTab';


interface LearningTabsProps {
    currentLesson:
        | {
              id: string;
              title: string;
              duration: string;
              completed?: boolean;
              current?: boolean;
          }
        | undefined;
    currentModule: string;
    resources: Array<{ title: string; type: string }>;
    notes: Array<{ timestamp: string; text: string }>;
    discussions: Array<{ user: string; text: string; replies: number }>;
    onAddNote: (text: string) => void;
}

export function LearningTabs({
    currentLesson,
    currentModule,
    resources,
    notes,
    discussions,
    onAddNote,
}: LearningTabsProps) {
    return (
        <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4">
                <AboutTab
                    title={currentLesson?.title || 'Lesson title'}
                    module={currentModule}
                    description="This lesson covers the fundamentals of decision trees in machine learning. You will learn about how decision trees work, their advantages and limitations, and how to implement them for classification and regression tasks."
                    learningPoints={[
                        'Decision tree algorithms (ID3, C4.5, CART)',
                        'Information gain and Gini impurity',
                        'Tree pruning techniques',
                        'Implementing decision trees in Python using scikit-learn',
                    ]}
                />
            </TabsContent>

            <TabsContent value="resources">
                <ResourcesTab resources={resources} />
            </TabsContent>

            <TabsContent value="notes">
                <NotesTab notes={notes} onAddNote={onAddNote} />
            </TabsContent>

            <TabsContent value="discussion">
                <DiscussionTab discussions={discussions} />
            </TabsContent>
        </Tabs>
    );
}
