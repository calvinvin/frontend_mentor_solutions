/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";

const margin = '64';
const logoWidth = '48';
const dashlineWidth = `calc(100%-${margin}px*2-${logoWidth}px)`;

export default function WebsiteLogo() {
    return (
        <div className="grow relative max-[960px]:grow-0">
            <Link 
            href="./" 
            className="block w-fit mx-[64px] max-[960px]:mx-[40px] max-[800px]:mx-0"
            >
                <Image 
                src="/assets/shared/logo.svg" width={logoWidth} height={logoWidth} alt=""
                >            
                </Image>
            </Link>
            <span className={`absolute block right-[-32px] top-[50%] w-[calc(100%-64px*2-48px)] h-[2px] bg-[#979797] opacity-[25%] z-10 max-[960px]:hidden`}></span>
        </div>
    )
}