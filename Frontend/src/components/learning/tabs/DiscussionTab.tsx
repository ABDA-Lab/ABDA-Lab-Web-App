import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Discussion {
    user: string;
    text: string;
    replies: number;
}

interface DiscussionTabProps {
    discussions: Discussion[];
}

export function DiscussionTab({ discussions }: DiscussionTabProps) {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Discussion ({discussions.length} comments)</h3>
                    <Button variant="outline">New Question</Button>
                </div>

                <Textarea placeholder="Join the discussion about this lesson..." className="mb-4" />

                <div className="space-y-4">
                    {discussions.map((discussion, index) => (
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
    );
}
