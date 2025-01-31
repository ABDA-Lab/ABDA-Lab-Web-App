import { useState } from 'react';
import { MenuItem } from './ui/navbar-menu';

export default function Navigation() {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className="">
            <MenuItem item="Home" active={active} setActive={setActive}>
                Home
            </MenuItem>
        </div>
    );
}
