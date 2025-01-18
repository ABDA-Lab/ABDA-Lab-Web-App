import { useState } from 'react';
import { MenuItem } from './ui/navbar-menu';

export default function Navigation() {
    const [active, setActive] = useState<string | null>(null);
    return (
        <nav className="flex items-center space-x-4 bg-white p-4">
            <div className="flex space-x-4">
                <MenuItem item="navbar" active={active} setActive={setActive}>
                    Home
                </MenuItem>
                <MenuItem item="navbar" active={active} setActive={setActive}>
                    {/* cspell: disable-next-line */}
                    About ABDA
                </MenuItem>
                <MenuItem item="navbar" active={active} setActive={setActive}>
                    Publications
                </MenuItem>
                <MenuItem item="navbar" active={active} setActive={setActive}>
                    Blog/Resources
                </MenuItem>
                <MenuItem item="navbar" active={active} setActive={setActive}>
                    Events
                </MenuItem>
            </div>
        </nav>
    );
}
