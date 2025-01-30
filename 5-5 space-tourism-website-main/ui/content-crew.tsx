'use client';

import { bellefair } from "@/ui/fonts"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { crewInCrew, transformCrewQuery } from "@/lib/functions";
import { IData } from "@/lib/definitions";

function CrewTabs({ 
    currentCrew, dataCrew
}: {
    currentCrew: string, dataCrew: IData['crew']
}) {
    const crewNames = dataCrew.map(crew=>crew.name);
    return(
        <nav
        className="mb-[2.5rem]
        max-[960px]:w-fit max-[960px]:mx-auto
        "
        >
            <ul
            className="flex gap-[2.5rem]"
            >
                {crewNames.map((crewName) => {
                    const params = new URLSearchParams();
                    params.set("crew", crewName);
                    return (
                        <li key={crewName}>
                            <Link
                            href={`/crew?${params.toString()}`}
                            className={`block w-[15px] h-[15px] rounded-[50%]
                                ${crewName===currentCrew ? "bg-figma-white" : "bg-figma-white/[.175] hover:bg-figma-white/50 transition-[background-color] duration-200" }`}
                            >
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default function ContentCrew({
    dataCrew
}: {
    dataCrew: IData['crew']
}) {
    const searchParams = useSearchParams();
    const crewQuery = transformCrewQuery(searchParams.get('crew'));
    const currentCrew = crewInCrew(crewQuery, dataCrew) ? crewQuery : 'Douglas Hurley';
    const { name, images, role, bio } = dataCrew.filter(crew=>crew.name===currentCrew)[0];


    return (
        <div
        className="grid grid-cols-2 gap-[2rem]
        max-[960px]:grid-cols-none max-[960px]:text-center max-[960px]:justify-items-center max-[960px]:pt-[2.5rem]
        "
        >
            <div
            className="grid grid-rows-[1fr_auto] gap-[1.5rem]"
            >
                <div className="content-center">
                    <p
                    className={`${bellefair.className} mb-[1rem] text-[2rem] uppercase text-figma-white/50
                    max-[960px]:text-[1.5rem]
                    max-[560px]:text-[1.125rem]`}
                    >
                        {role}
                    </p>
                    <h1
                    className={`${bellefair.className} mb-[1.5rem] text-[3.5rem] uppercase text-figma-white leading-[1]
                    max-[960px]:text-[2.5rem] max-[960px]:mt-[1rem]
                    max-[560px]:text-[1.5rem]
                    `}
                    >
                        {name}
                    </h1>
                    <p
                    className=" text-[1.125rem] tracking-[1.8] text-figma-blue-300 max-[960px]:mb-[1rem]
                    max-[960px]:text-[1rem]
                    max-[560px]:text-[0.9375rem]"
                    >
                        {bio}
                    </p>
                </div>
                <CrewTabs currentCrew={currentCrew} dataCrew={dataCrew}></CrewTabs>
            </div>
            <div
            className="relative self-end">
                <img
                src={'/frontend_mentor_5-5_space-tourism-website-main' + images.png.substring(1,)}
                alt={""}
                className="block object-contain max-h-[676px] max-[960px]:h-[560px]"
                ></img>
                <div
                className="absolute inset-0 bg-linear-to-b from-77% via-[#000000]/0 to-figma-blue-900"
                ></div>
            </div>
        </div>
    )
}