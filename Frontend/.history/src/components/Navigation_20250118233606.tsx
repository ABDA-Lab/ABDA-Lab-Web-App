import { MenuItem } from './ui/navbar-menu';
import Home from '../../.history/src/app/page_20250118115829';

export default function Navigation() {
    return (
        <div className="">
            <MenuItem item="Home" active="Home" setActive={() => {}}>
                Home
            </MenuItem>
        </div>
    );
}
