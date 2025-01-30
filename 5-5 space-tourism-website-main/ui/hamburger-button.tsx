import Image from "next/image";

export default function HamburgerButton ({toggleSideNav}: {toggleSideNav: ()=>void}) {
    return (
        <button className="hidden max-[800px]:block cursor-pointer" onClick={toggleSideNav}>
            <Image src="/frontend_mentor_5-5_space-tourism-website-main/assets/shared/icon-hamburger.svg" width={24} height={21} alt=""></Image>
        </button>
    )
}