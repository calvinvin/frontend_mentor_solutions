// import { barlow } from "@/ui/fonts";
import { IData } from "@/lib/definitions";
import { getDataJson } from "@/lib/data"
import { barlow_condensed } from "@/ui/fonts";
import ContentTechnology from "@/ui/content-technology";
import { Suspense } from "react";

export default async function Technology () {
    const file = await getDataJson();
    const dataTechnology = (JSON.parse(file) as IData).technology;

    return (
        <main className="ms-auto py-[48px] ps-[48px] max-w-[calc(1275px+48px)] grid grid-rows-[auto_1fr]
        max-[960px]:py-[40px] max-[960px]:ps-0 
        ">
            <p
            className={`mb-[1.5rem] ${barlow_condensed.className} text-figma-white text-[1.75rem] tracking-[4px] uppercase
            max-[960px]:px-[24px] max-[960px]:text-[1.25rem]
            max-[560px]:text-[1rem]
            
            `}
            >
                <span 
                className="me-[24px] text-red-100 font-bold tracking-[4.72px] opacity-25"
                >
                    03
                </span>
                space launch 101
            </p>
            <Suspense>
                <ContentTechnology dataTechnology={dataTechnology}></ContentTechnology>
            </Suspense>
        </main>            
    )
}