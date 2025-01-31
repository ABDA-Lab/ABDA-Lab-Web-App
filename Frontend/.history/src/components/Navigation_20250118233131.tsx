import { useState } from 'react';
import { MenuItem } from './ui/navbar-menu';

export default function Navigation() {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className="">
            <MenuItem item="Test" active={active} setActive={setActive}>
                Home
            </MenuItem>
        </div>
    );
}
