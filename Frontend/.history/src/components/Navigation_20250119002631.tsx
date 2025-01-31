import { useState } from 'react';
import { Menu, MenuItem, ProductItem } from './ui/navbar-menu';

export default function Navigation() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    return (
        <Menu setActive={setActiveMenu}>
            <MenuItem item="Home" active={activeMenu} setActive={setActiveMenu}>
                <ProductItem
                    title="Research"
                    description="Our research in AI, ML, and data analytics"
                    href=""
                    src="https://www.vinai.io/wp-content/uploads/2023/01/3.-ML-shutterstock_2152292393-Horizontal-2560-px.jpg"
                />
            </MenuItem>
            <MenuItem item="About ABDA" active={activeMenu} setActive={setActiveMenu}>
                <div className="grid grid-cols-3 gap-4">
                    <ProductItem
                        title="Research"
                        description="Our research in AI, ML, and data analytics"
                        href=""
                        src="https://www.vinai.io/wp-content/uploads/2023/01/3.-ML-shutterstock_2152292393-Horizontal-2560-px.jpg"
                    />
                    <ProductItem
                        title="Projects"
                        description="Innovative AI projects and applications"
                        href=""
                        src="https://research.vinai.io/wp-content/uploads/2023/09/5-Amazing-Examples-Of-Natural-Language-Processing-NLP-In-Practice-1200x639-1-1024x545.jpg"
                    />
                    <ProductItem
                        title="Lab Members"
                        description="Our team of researchers and engineers"
                        href=""
                        src="https://news.vinai.io/wp-content/uploads/2025/01/VinAI-at-CES-2025.jpg"
                    />
                    <ProductItem
                        title="Alumni Members"
                        description="Our distinguished alumni network"
                        href=""
                        src="https://plus.unsplash.com/premium_photo-1679429320956-f6171b6f006b?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <ProductItem
                        title="Colaboration"
                        description="Partner with us on research projects"
                        href=""
                        src="https://research.vinai.io/wp-content/uploads/2023/10/Machine-learning-1024x512.jpg"
                    />
                    <ProductItem
                        title="Contact"
                        description="Get in touch with our team"
                        href=""
                        src="https://www.vinai.io/wp-content/uploads/MirrorSense-CES-Award-KV-1.png"
                    />
                </div>
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
        </Menu>
    );
}
