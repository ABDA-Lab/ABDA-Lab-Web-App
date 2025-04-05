'use client';
import { ArrowRight, Brain, FlaskConical, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function ResearchAreasSection() {
    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Research Focus</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Pushing the boundaries of artificial intelligence through innovative research in these key areas
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    {
                        title: 'Machine Learning Algorithms',
                        description:
                            'Developing novel approaches to supervised and unsupervised learning with applications in various domains.',
                        icon: <Brain className="h-10 w-10 text-primary" />,
                    },
                    {
                        title: 'Natural Language Processing',
                        description:
                            'Advancing language understanding and generation capabilities for more natural human-computer interaction.',
                        icon: <Lightbulb className="h-10 w-10 text-primary" />,
                    },
                    {
                        title: 'Computer Vision',
                        description:
                            'Creating systems that can interpret and make decisions based on visual data from the real world.',
                        icon: <FlaskConical className="h-10 w-10 text-primary" />,
                    },
                ].map((item, index) => (
                    <Card key={index} className="border border-muted">
                        <CardHeader>
                            <div className="mb-4">{item.icon}</div>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">{item.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" className="gap-2">
                                Learn more <ArrowRight className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}