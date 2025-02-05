import { useState } from 'react';
import { Menu, MenuItem, ProductItem } from './ui/navbar-menu';

export default function Navigation() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [activeItemMenuItem, setActiveItemMenu] = useState<string | null>(null);
    const [activeItemProduct, setActiveItemProduct] = useState<string | null>(null);

    return (
        <Menu setActive={activeMenu}>
            <MenuItem item="Home" active={activeItemMenuItem} setActive={setActiveItemMenu}>
                <ProductItem item="Product1" active={activeItemProduct} setActive={activeItemProduct}></ProductItem>
            </MenuItem>
            <MenuItem item="About ABDA" active={activeItemMenuItem} setActive={setactiveItemMenuItem}>
                Content 2
            </MenuItem>
            <MenuItem item="Publications" active={activeItemMenuItem} setActive={setactiveItemMenuItem}>
                Content 3
            </MenuItem>
            <MenuItem item="Blog/Resources" active={activeItemMenuItem} setActive={setactiveItemMenuItem}>
                Content 4
            </MenuItem>
            <MenuItem item="Events" active={activeItemMenuItem} setActive={setactiveItemMenuItem}>
                Content 5
            </MenuItem>
        </Menu>
    );
}
