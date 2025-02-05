import { useState } from 'react';
import { Menu, MenuItem } from './ui/navbar-menu';

export default function Navigation() {
    const [activeItem, setActiveItem] = useState<string | null>(null);
   
    return (
        <div className="">
            <Menu setActive={setActiveItem}>
                <MenuItem item='home' active={activeItem}>Home</MenuItem>
                <MenuItem>About</MenuItem>
            </Menu>
        </div>
    );
}
