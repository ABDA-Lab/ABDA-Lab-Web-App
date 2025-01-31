import { useState } from 'react';
import { Menu, MenuItem } from './ui/navbar-menu';

export default function Navigation() {
   
    return (
        <div className="">
            <Menu active={active} setActive={setActive}>

            </Menu>
        </div>
    );
}
