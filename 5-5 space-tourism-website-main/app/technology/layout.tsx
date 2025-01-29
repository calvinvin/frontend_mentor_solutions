import Header from "@/ui/header"
import { barlow } from "@/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Technology',
}

const backgroundImagePath = {
    'desktop': '/assets/technology/background-technology-desktop.jpg',
    'tablet': '/assets/technology/background-technology-tablet.jpg',
    'mobile': '/assets/technology/background-technology-mobile.jpg',
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
        className={`${barlow.className} min-h-svh bg-no-repeat bg-cover bg-center grid grid-rows-[auto_1fr]
        bg-[url(/assets/technology/background-technology-desktop.jpg)]
        max-[960px]:bg-[url(/assets/technology/background-technology-tablet.jpg)]
        `}
        >
            <Header currentPage="technology"></Header>
            {children}
        </div>
    )
}