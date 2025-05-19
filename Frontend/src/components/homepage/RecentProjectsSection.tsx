'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export default function RecentProjectsSection() {
    return (
        <section className="py-16 bg-muted/50 rounded-xl p-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Recent Publications</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Our latest contributions to the field of artificial intelligence
                </p>
            </div>

            <div className="space-y-6">
                {[
                    {
                        title: 'Transformers for Time Series Forecasting',
                        authors: 'Zhang, L., Smith, J., et al.',
                        conference: 'ICML 2024',
                        description:
                            'A novel approach to applying transformer architectures to multivariate time series data.',
                    },
                    {
                        title: 'Efficient Graph Neural Networks for Large-Scale Knowledge Graphs',
                        authors: 'Johnson, A., Patel, R., et al.',
                        conference: 'NeurIPS 2024',
                        description:
                            'Scaling graph neural networks to billion-node knowledge graphs with minimal computational overhead.',
                    },
                ].map((paper, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{paper.title}</CardTitle>
                            <CardDescription>
                                {paper.authors} — {paper.conference}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{paper.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline">View Paper</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="text-center mt-8">
                <Button asChild variant="default">
                    <Link href="/publications">View All Publications</Link>
                </Button>
            </div>
        </section>
    );
}
