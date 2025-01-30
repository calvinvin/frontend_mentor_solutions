import Header from "@/ui/header"
import { barlow } from "@/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Technology',
}

const backgroundImagePath = {
    'desktop': '/frontend_mentor_5-5_space-tourism-website-main/assets/technology/background-technology-desktop.jpg',
    'tablet': '/frontend_mentor_5-5_space-tourism-website-main/assets/technology/background-technology-tablet.jpg',
    'mobile': '/frontend_mentor_5-5_space-tourism-website-main/assets/technology/background-technology-mobile.jpg',
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
        className={`${barlow.className} min-h-svh bg-no-repeat bg-cover bg-center grid grid-rows-[auto_1fr]
        bg-[url(/frontend_mentor_5-5_space-tourism-website-main/assets/technology/background-technology-desktop.jpg)]
        max-[960px]:bg-[url(/frontend_mentor_5-5_space-tourism-website-main/assets/technology/background-technology-tablet.jpg)]
        max-[560px]:bg-[url(/frontend_mentor_5-5_space-tourism-website-main/assets/technology/background-technology-mobile.jpg)]
        `}
        >
            <Header currentPage="technology"></Header>
            {children}
        </div>
    )
}