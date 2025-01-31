import { useState } from 'react';
import { Menu, MenuItem, ProductItem } from './ui/navbar-menu';

export default function Navigation() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [activeItemMenuItem, setActiveItemMenu] = useState<string | null>(null);
    // const [activeItemProduct, setActiveItemProduct] = useState<string | null>(null);

    return (
        <Menu setActive={setActiveMenu}>
            <MenuItem item="Home" active={activeMenu} setActive={setActiveMenu}></MenuItem>
            <MenuItem item="About ABDA" active={activeMenu} setActive={setActiveMenu}>
                <ProductItem
                    title="Research"
                    description=" Test content"
                    href=""
                    src="https://www.vinai.io/wp-content/uploads/2023/01/3.-ML-shutterstock_2152292393-Horizontal-2560-px.jpg"
                />
                <ProductItem
                    title="Projects"
                    description=" Test content"
                    href=""
                    src="https://www.vinai.io/wp-content/uploads/2023/01/3.-ML-shutterstock_2152292393-Horizontal-2560-px.jpg"
                />
                <ProductItem
                    title="Lab Members"
                    description=" Test content"
                    href=""
                    src="https://www.vinai.io/wp-content/uploads/2023/01/3.-ML-shutterstock_2152292393-Horizontal-2560-px.jpg"
                />
                <ProductItem
                    title="Alumni Members"
                    description=" Test content"
                    href=""
                    src="https://www.vinai.io/wp-content/uploads/2023/01/3.-ML-shutterstock_2152292393-Horizontal-2560-px.jpg"
                />
                <ProductItem
                    title="Colaboration"
                    description=" Test content"
                    href=""
                    src="https://www.vinai.io/wp-content/uploads/2023/01/3.-ML-shutterstock_2152292393-Horizontal-2560-px.jpg"
                />
            </MenuItem>
            <MenuItem item="Publications" active={activeMenu} setActive={setActiveMenu}>
                <ProductItem title="" description=" Test content" href="" src="" />
            </MenuItem>
            <MenuItem item="Blog|Resources" active={activeMenu} setActive={setActiveMenu}>
                <ProductItem title="" description=" Test content" href="" src="" />
            </MenuItem>
            <MenuItem item="Events" active={activeMenu} setActive={setActiveMenu}>
                <ProductItem title="" description=" Test content" href="" src="" />
            </MenuItem>
            {/* <MenuItem item="About ABDA" active={activeItem} setActive={setActiveItem}>
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
            </MenuItem> */}
        </Menu>
    );
}
