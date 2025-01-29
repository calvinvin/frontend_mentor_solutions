import { barlow_condensed } from "./fonts";
import Link from "next/link";

type navLink = {
    href: string,
    text: string,
};

const navLinks: Array<navLink> = [
    {href: './', text: 'home'},
    {href: './destination', text: 'destination'},
    {href: './crew', text: 'crew'},
    {href: './technology', text: 'technology'},
];

function ListItem (navLink: navLink, currentPage: string) {
    return (
        <li key={navLink.href}
        className= {`[counter-increment:cc] flex items-center relative after:absolute after:content-[''] after:transition-[scale] after:duration-150
            min-[800px]:after:left-0 min-[800px]:after:bottom-0 min-[800px]:after:right-0 min-[800px]:after:border-b-[3px]
            max-[800px]:after:right-0 max-[800px]:after:top-0 max-[800px]:after:bottom-0 max-[800px]:after:border-r-[3px]
            ${navLink.text===currentPage ? 
                `after:border-figma-white` : 
                `after:border-figma-white/50 after:scale-0 hover:after:scale-100`}
                `}
        >
            <Link href={navLink.href}
            className={ `text-[#FFF] flex gap-[12px] tracking-[2px] ${barlow_condensed.className}
            before:content-[counter(cc,decimal-leading-zero)'_'] before:font-bold before:tracking-[2.7px]`
            }
            >{navLink.text}</Link>
        </li>
    );
}

export default function NavMenu({
    currentPage, sideNavExpanded, toggleSideNav,
}: {
    currentPage: string, sideNavExpanded: boolean, toggleSideNav: ()=>void,
}) {
    return (
        <nav className={`backdrop-blur-3xl bg-figma-white/[.05] z-100
            max-[960px]:grow
            max-[800px]:fixed max-[800px]:right-0 max-[800px]:top-0 max-[800px]:bottom-0 max-[800px]:w-[max(50%,16rem)]
        ${sideNavExpanded ? "max-[800px]:block" : "max-[800px]:hidden"}
        `}
        >
            <ul 
            className={`h-[6rem] flex gap-[48px] items-stretch uppercase px-[64px] [counter-reset:cc_-1]
                max-[960px]:justify-end max-[960px]:px-[40px] 
                max-[800px]:flex-col max-[800px]:ps-[32px] max-[800px]:pe-0 max-[800px]:gap-[32px] max-[800px]:h-auto`}
            >
                <li
                className="py-[32px] pe-[24px] mb-[48px] self-end min-[800px]:hidden"
                >
                    <button onClick={toggleSideNav}
                    className="cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21"><g fill="#D0D6F9" fillRule="evenodd"><path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z"/><path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z"/></g></svg>
                    </button>
                </li>
                {
                    navLinks.map((navLink)=>ListItem(navLink, currentPage))
                }
            </ul>
        </nav>
    );
}