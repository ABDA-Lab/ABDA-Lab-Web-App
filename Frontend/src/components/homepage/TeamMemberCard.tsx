'use client';
import Image from 'next/image';

type TeamMember = {
    id: number;
    name: string;
    degree: string;
    title: string;
    image: string;
};

export default function TeamMemberCard({ member }: { member: TeamMember }) {
    return (
        <div className="flex flex-col items-center p-6 bg-card border rounded-lg shadow-sm transition-all hover:shadow-md">
            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image src={member.image} alt={member.name} fill className="object-cover" priority />
            </div>
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.degree}</p>
            <p className="text-base mt-1">{member.title}</p>
        </div>
    );
}