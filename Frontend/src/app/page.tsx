import React from 'react';
import WelcomeMessage from '@/components/homepage/WelcomeMessage';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, FlaskConical, Lightbulb, Link, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ResearchAreasSection from '@/components/homepage/ResearchAreasSection';
import RecentProjectsSection from '@/components/homepage/RecentProjectsSection';
import TeamSection from '@/components/homepage/TeamSection';
import CallToAction from '@/components/homepage/CallToAction';

export const metadata: Metadata = {
    title: 'Homepage',
    description: 'Homepage for ABDA Lab',
};

export default function Home() {
    return (
        <div className="py-40">
            <main className="">
                <WelcomeMessage
                    title="Welcome to ABDA Lab"
                    description="Exploring cutting-edge AI algorithms and data structures through innovative research and experimentation. Join us in advancing the boundaries of artificial intelligence."
                    titleClassName="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg z-0"
                    descriptionClassName="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none"
                />
            </main>
            {/* Research Areas Section */}
            <ResearchAreasSection/>

            {/* Recent Projects Section */}
            <RecentProjectsSection />

            {/* Team Section */}
            <TeamSection/>

            {/* Call to Action */}
            <CallToAction />
        </div>
    );
}
