import { barlow_condensed } from "@/ui/fonts";
import { IData } from "@/lib/definitions";
import { getDataJson } from "@/lib/data";
import ContentDestinations from "@/ui/content-destinations";
import { Suspense } from "react";

export default async function Destination() {
    const file = await getDataJson();
    const dataDestinations = (JSON.parse(file) as IData).destinations;

    return (
        <main 
        className={`mx-auto p-[3rem] max-w-[calc(1110px+3rem*2)] grid  grid-rows-[auto_1fr] align-middle
            max-[960px]:p-[40px]
            max-[560px]:p-[24px]
        `}>
            <p
            className={`mb-[1.5rem] ${barlow_condensed.className} text-figma-white text-[1.75rem] tracking-[4px] uppercase
            max-[960px]:text-[1.25rem]
            max-[560px]:text-[1rem]
            `}
            >
                <span 
                className="me-[24px] text-red-100 font-bold tracking-[4.72px] opacity-25"
                >
                    01
                </span>
                pick your destination
            </p>
            <Suspense>
                <ContentDestinations dataDestinations={dataDestinations}></ContentDestinations>
            </Suspense>
        </main>
    )
}