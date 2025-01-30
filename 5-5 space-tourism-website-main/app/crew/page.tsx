import { barlow_condensed } from "@/ui/fonts"
import { transformCrewQuery, crewInCrew } from "@/lib/functions";
import { getDataJson } from "@/lib/data";
import { IData } from "@/lib/definitions";
import ContentCrew from "@/ui/content-crew";
import { Suspense } from "react";


export default async function Crew () {
    const file = await getDataJson();
    const dataCrew = (JSON.parse(file) as IData).crew;

    return (
        <main 
        className="mx-auto px-[40px] py-[3rem] max-w-[1110px] grid grid-rows-[auto_1fr]
        max-[960px]:py-[40px]
        max-[560px]:p-[24px] max-[560px]:text-center
        ">
            <p
            className={`mb-[1.5rem] ${barlow_condensed.className} text-figma-white text-[1.75rem] tracking-[4px] uppercase
            max-[960px]:text-[1.25rem]
            max-[560px]:text-[1rem]
            `}
            >
                <span 
                className="me-[24px] text-red-100 font-bold tracking-[4.72px] opacity-25"
                >
                    02
                </span>
                meet your crew
            </p>
            <Suspense>
                <ContentCrew dataCrew={dataCrew}></ContentCrew>
            </Suspense>
        </main>            
    )
}