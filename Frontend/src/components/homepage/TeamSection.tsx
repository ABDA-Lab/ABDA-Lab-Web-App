'use client';
import Link from "next/link";
import { Button } from "../ui/button";
import { Users } from "lucide-react";

export default function TeamSection() {
    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    A diverse group of researchers and engineers pushing the boundaries of AI
                </p>
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
