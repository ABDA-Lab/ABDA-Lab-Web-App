'use client';

import Link from 'next/link';
import { Button } from '../ui/button';

export default function CallToAction() {
    return (
        <section className="py-16 bg-primary text-primary-foreground rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Research Community</h2>
            <p className="max-w-2xl mx-auto mb-8">
                Interested in collaborating or joining our lab? We are always looking for passionate researchers and
                students.
            </p>
            <div className="flex justify-center gap-4">
                <Button asChild variant="secondary" size="lg">
                    <Link href="/contact">Contact Us</Link>
                </Button>
                <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-white hover:bg-white hover:text-primary">
                    <Link href="/opportunities">View Opportunities</Link>
                </Button>
            </div>
        </section>
    );
}
