import { useState } from 'react';
import { MenuItem } from './ui/navbar-menu';
import Home from '../../.history/src/app/page_20250118115829';

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
