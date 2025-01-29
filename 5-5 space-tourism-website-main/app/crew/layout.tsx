import Header from "@/ui/header"
import { barlow } from "@/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Crew',
}

const backgroundImagePath = {
    'desktop': '/assets/crew/background-crew-desktop.jpg',
    'tablet': '/assets/crew/background-crew-tablet.jpg',
    'mobile': '/assets/crew/background-crew-mobile.jpg',
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
        className={`${barlow.className} min-h-svh bg-no-repeat bg-cover bg-center grid grid-rows-[auto_1fr]
        bg-[url(/assets/crew/background-crew-desktop.jpg)]
        max-[960px]:bg-[url(/assets/crew/background-crew-tablet.jpg)]
        `}
        >
            <Header currentPage="crew"></Header>
            {children}
        </div>
    )
}