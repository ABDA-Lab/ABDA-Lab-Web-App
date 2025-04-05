'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Users } from 'lucide-react';
import TeamMemberCard from './TeamMemberCard';

type TeamMember = {
    id: number;
    name: string;
    degree: string;
    title: string;
    image: string;
};
// Sample team members data
const featuredMembers: TeamMember[] = [
    {
        id: 1,
        name: 'Prof. Huynh Cong Viet Ngu',
        degree: 'Ph.D.',
        title: 'Laboratory Director',
        image: 'https://cloud.appwrite.io/v1/storage/buckets/67dbb6420032d8a2ee8f/files/67f1814064eb19ba48c8/view?project=67dbb339000bfac45e0d',
    },
    {
        id: 2,
        name: 'Dr. Emily Chen',
        degree: 'Ph.D.',
        title: 'Senior AI Researcher',
        image: 'https://plus.unsplash.com/premium_photo-1683133278773-112873ebdb18?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 3,
        name: 'David Johnson',
        degree: 'M.S.',
        title: 'Research Engineer',
        image: 'https://plus.unsplash.com/premium_photo-1683133278773-112873ebdb18?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];
export default function TeamSection() {
    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    A diverse group of researchers and engineers pushing the boundaries of AI
                </p>
            </div>

            {/* Team member cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-12">
                {featuredMembers.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                ))}
            </div>

            <div className="flex items-center justify-center mb-8">
                <Button asChild variant="outline" className="gap-2">
                    <Link href="/team">
                        <Users className="h-4 w-4" /> View All Team Members
                    </Link>
                </Button>
            </div>
        </section>
    );
}
