import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

interface Resource {
    title: string;
    type: string;
}

interface ResourcesTabProps {
    resources: Resource[];
}

export function ResourcesTab({ resources }: ResourcesTabProps) {
    return (
        <Card>
            <CardContent className="p-4">
                <h3 className="font-medium mb-4">Learning Materials</h3>
                <div className="space-y-3">
                    {resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
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
    );
}
