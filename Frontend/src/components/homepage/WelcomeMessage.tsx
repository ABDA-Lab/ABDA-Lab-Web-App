'use client';
import { cn } from '@/lib/utils';
import { Boxes } from '../ui/background-boxes';

type Props = {
    titleClassName?: string;
    descriptionClassName?: string;
    title?: string;
    description?: string;
};

export default function WelcomeMessage({ titleClassName, descriptionClassName, title, description }: Props) {
    return (
        <div className={titleClassName}>
            <div className={descriptionClassName} />
            <Boxes />
            <h1 className={cn('md:text-4xl text-xl text-white relative z-20')}>{title}</h1>
            <p className="text-center mt-2 text-neutral-300 relative z-20">{description}</p>
        </div>
    );
}
