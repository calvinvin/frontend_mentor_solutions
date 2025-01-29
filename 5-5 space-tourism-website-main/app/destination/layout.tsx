import Header from "@/ui/header"
import { barlow } from "@/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Destination',
}

const backgroundImagePath = {
    'desktop': '/assets/destination/background-destination-desktop.jpg',
    'tablet': '/assets/destination/background-destination-tablet.jpg',
    'mobile': '/assets/destination/background-destination-mobile.jpg',
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
        className={`${barlow.className} min-h-svh bg-no-repeat bg-cover bg-center grid grid-rows-[auto_1fr]
        bg-[url(/assets/destination/background-destination-desktop.jpg)]
        max-[960px]:bg-[url(/assets/destination/background-destination-tablet.jpg)]
        `}
        >
            <Header currentPage="destination"></Header>
            {children}
        </div>
    )
}