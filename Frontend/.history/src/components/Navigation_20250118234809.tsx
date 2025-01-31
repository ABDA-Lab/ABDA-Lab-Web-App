import { useState } from 'react';
import { Menu, MenuItem } from './ui/navbar-menu';

export default function Navigation() {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    return (
        // <div className="">
        <Menu setActive={setActiveItem}>
            <MenuItem item="Home" active={activeItem} setActive={setActiveItem}>
                Content 1
            </MenuItem>
            <MenuItem item="About ABDA" active={activeItem} setActive={setActiveItem}>
                Content 2
            </MenuItem>
            <MenuItem item="Publications" active={activeItem} setActive={setActiveItem}>
                Content 3
            </MenuItem>
            <MenuItem item="Blog/Resources" active={activeItem} setActive={setActiveItem}>
                Content 4
            </MenuItem>
            <MenuItem item="Events" active={activeItem} setActive={setActiveItem}>
                Content 5
            </MenuItem>
        </Menu>
        // </div>
    );
}
