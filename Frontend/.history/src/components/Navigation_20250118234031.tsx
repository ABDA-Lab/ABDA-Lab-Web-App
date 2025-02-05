import { useState } from 'react';
import { MenuItem } from './ui/navbar-menu';

export default function Navigation() {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className="">
            <MenuItem item="navbar" active={active} setActive={setActive}>
                Home
            </MenuItem>
            <MenuItem item="navbar" active={active} setActive={setActive}>
                About ABDA
            </MenuItem>
            <MenuItem item="navbar" active={active} setActive={setActive}>
                Publications
            </MenuItem>
            <MenuItem item="navbar" active={active} setActive={setActive}>
                Blog/Resources
            </MenuItem>
            <MenuItem item="Home" active={active} setActive={setActive}>
                Events
            </MenuItem>
        </div>
    );
}
