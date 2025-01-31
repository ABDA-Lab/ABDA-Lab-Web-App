import { MenuItem } from './ui/navbar-menu';

export default function Navigation() {
    return (
        <div className="">
            <MenuItem item="Home" active="Home" setActive={() => {}}>
                Home
            </MenuItem>
        </div>
    );
}
