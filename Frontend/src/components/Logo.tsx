import { TypewriterEffect } from './ui/typewriter-effect';

export default function Logo() {
    const words = [
        {
            text: 'ABDA',
            className: 'text-[18px]',
        },
        {
            text: ':',
            className: 'text-[18px]',
        },
        {
            text: 'Lab',
            className: 'text-[18px]',
        },
    ];
    return (
        // <TypewriterEffect cursorClassName="" className="text-sm font-bold whitespace-nowrap" words={words} />
        <div className="text-lg font-bold whitespace-nowrap">ABDA:Lab</div>
    );
}
