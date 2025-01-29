'use client';

import WebsiteLogo from "@/ui/website-logo";
import HamburgerButton from "@/ui/hamburger-button";
import NavMenu from "@/ui/nav-menu";
import { useState } from "react";


export default function Header({ currentPage }: { currentPage: string}) {
    const [sideNavExpanded, setSideNavExpanded] = useState(false);
    function toggleSideNav() {
        setSideNavExpanded(!sideNavExpanded);
    } 
    return (
        <header className="flex items-center mt-[2.5rem] max-[960px]:mt-0 max-[800px]:p-[24px] max-[800px]:justify-between">
            <WebsiteLogo></WebsiteLogo>
            <HamburgerButton toggleSideNav={toggleSideNav}></HamburgerButton>
            <NavMenu currentPage={currentPage} sideNavExpanded={sideNavExpanded} toggleSideNav={toggleSideNav}></NavMenu>
        </header>
    );
}