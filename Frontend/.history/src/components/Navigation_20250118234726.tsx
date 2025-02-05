import { useState } from 'react';
import { Menu, MenuItem } from './ui/navbar-menu';

export default function Navigation() {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    return (
        <div className="">
            <Menu setActive={setActiveItem}>
                <MenuItem item="Home" active={activeItem} setActive={setActiveItem}>
                    Content 1
                </MenuItem>
                <MenuItem item="About ABDA" active={activeItem} setActive={setActiveItem}>
                    Content 1
                </MenuItem>
                <MenuItem item="Home" active={activeItem} setActive={setActiveItem}>
                    Content 1
                </MenuItem>
                <MenuItem item="Home" active={activeItem} setActive={setActiveItem}>
                    Content 1
                </MenuItem>
                <MenuItem item="Home" active={activeItem} setActive={setActiveItem}>
                    Content 1
                </MenuItem>
            </Menu>
        </div>
    );
}
