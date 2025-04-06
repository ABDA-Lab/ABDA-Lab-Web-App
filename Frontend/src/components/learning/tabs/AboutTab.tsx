import { Card, CardContent } from '@/components/ui/card';

interface AboutTabProps {
    title: string;
    module: string;
    description: string;
    learningPoints: string[];
}

export function AboutTab({ title, module, description, learningPoints }: AboutTabProps) {
    return (
        <Card>
            <CardContent className="p-4">
                <h3 className="text-xl font-medium mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm mb-4">Part of: {module}</p>
                <p>{description}</p>
                <div className="mt-4">
                    <h4 className="font-medium mb-2">What you will learn:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        {learningPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
