import { useState } from 'react';
import { MenuItem } from './ui/navbar-menu';

export default function Navigation() {
    const [active, setActive] = useState<string | null>(null);
    return (
        <nav className="w-full bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
                <MenuItem item="" active={active} setActive={setActive}>
                    Home
                </MenuItem>
                {/* Add more MenuItems here as needed */}
            </div>
        </nav>
    );
}
