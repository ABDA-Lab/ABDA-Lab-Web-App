import { useState } from 'react';
import { MenuItem } from './ui/navbar-menu';

export default function Navigation() {
    const [active, setActive] = useState<string | null>(null);
    return (
        <nav className="w-full bg-white shadow-md">
            
                <MenuItem item="" active={active} setActive={setActive}>
                    Home
                </MenuItem>
                {/* Add more MenuItems here as needed */}
        </nav>
    );
}
