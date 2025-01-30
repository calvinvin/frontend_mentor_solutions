import Header from "@/ui/header"
import { barlow } from "@/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Destination',
}

const backgroundImagePath = {
    'desktop': '/frontend_mentor_5-5_space-tourism-website-main/assets/destination/background-destination-desktop.jpg',
    'tablet': '/frontend_mentor_5-5_space-tourism-website-main/assets/destination/background-destination-tablet.jpg',
    'mobile': '/frontend_mentor_5-5_space-tourism-website-main/assets/destination/background-destination-mobile.jpg',
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
        className={`${barlow.className} min-h-svh bg-no-repeat bg-cover bg-center grid grid-rows-[auto_1fr]
        bg-[url(/frontend_mentor_5-5_space-tourism-website-main/assets/destination/background-destination-desktop.jpg)]
        max-[960px]:bg-[url(/frontend_mentor_5-5_space-tourism-website-main/assets/destination/background-destination-tablet.jpg)]
        max-[560px]:bg-[url(/frontend_mentor_5-5_space-tourism-website-main/assets/destination/background-destination-mobile.jpg)]
        `}
        >
            <Header currentPage="destination"></Header>
            {children}
        </div>
    )
}