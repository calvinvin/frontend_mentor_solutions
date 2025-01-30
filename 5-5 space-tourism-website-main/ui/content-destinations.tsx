'use client';

import Image from "next/image";
import Link from "next/link";
import { bellefair, barlow_condensed } from "@/ui/fonts";
import { useSearchParams } from "next/navigation";
import { IData } from "@/lib/definitions";
import { planetInDestinations, capitalizeString } from "@/lib/functions";

function PlanetTabs({
    currentPlanet, dataDestinations 
}: {
    currentPlanet: string,
    dataDestinations: IData['destinations'],
}) {
    const planets = dataDestinations.map(destination=>destination.name);
    return (
        <nav 
        className="mb-[2.5rem] max-[960px]:w-fit max-[960px]:mx-auto max-[960px]:mb-[1.5rem]"
        >
            <ul
            className="flex gap-[11px]"
            >
                {planets.map((planetName)=>
                    <li key={planetName}>
                        <Link href={`/destination?planet=${planetName}`}
                        className={`${barlow_condensed.className} tracking-[2px] 
                        pb-[8px] relative
                        max-[560px]:text-[0.875rem]
                        ${planetName===currentPlanet ? 
                            `text-figma-white 
                            after:absolute after:content-[''] after:bottom-0 after:left-0 after:w-full after:border-b-[3px] after:border-b-figma-white` : 
                            `text-figma-blue-300
                            after:absolute after:content-[''] after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:w-full after:scale-x-0 after:border-b-[3px] after:border-b-figma-white/50
                            hover:after:scale-x-100 after:transition-[scale] after:duration-200`}
                        `}
                        >
                            {planetName}
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default function ContentDestinations({
    dataDestinations
}: {
    dataDestinations: IData['destinations']
}) {
    const searchParams = useSearchParams();
    const planetQuery = capitalizeString(searchParams.get('planet'));
    const currentPlanet = planetInDestinations(planetQuery, dataDestinations) ? planetQuery : 'Moon';
    console.log(currentPlanet);
    const { name, images, description, distance, travel } = dataDestinations.filter(destination=>destination.name===currentPlanet)[0];
    return (
        <div
        className={`grid grid-cols-2 gap-[2rem] items-center
            max-[960px]:grid-cols-none max-[960px]:text-center max-[960px]:justify-items-center
        `}
        >
            <Image
            src={images.png.substring(1,)}
            width={445}
            height={445}
            alt={""}
            className="w-[30rem] aspect-square max-[960px]:w-[18.75rem] max-[960px]:self-center max-[960px]:my-[42px]
            max-[560px]:w-[9.375rem]"
            ></Image>
            <div className="px-[47px]"
            >
                <PlanetTabs dataDestinations={dataDestinations} currentPlanet={currentPlanet}></PlanetTabs>
                <h1 
                className={`${bellefair.className} text-[6rem] text-figma-white uppercase mb-[1rem] leading-[1]
                max-[960px]:text-[5rem]
                max-[560px]:text-[3.5rem]
                `}
                >
                    {name}
                </h1>
                <p
                className="text-[1.125rem] text-figma-blue-300 tracking-[1.8] pb-[1rem] border-b-[1px] border-b-figma-white/25 mb-[1rem]
                max-[960px]:pb-[1.5rem] max-[960px]:mb-[1.5rem] max-[960px]:text-[1rem]
                max-[560px]:text-[0.9375rem]"
                >
                    {description}
                </p>
                <div
                className="grid grid-cols-2 gap-[1.5rem]
                max-[560px]:grid-cols-none"
                >
                    <p
                    className={`${barlow_condensed.className} text-[0.875rem] tracking-[2px] text-figma-blue-300 uppercase`}
                    >
                        avg. distance
                        <strong
                        className={`block mt-[0.75rem] ${bellefair.className} text-[1.75rem] text-figma-white`}
                        >
                            {distance}
                        </strong>
                    </p>
                    <p
                    className={`${barlow_condensed.className} text-[0.875rem] tracking-[2px] text-figma-blue-300 uppercase`}
                    >
                        est. travel time
                        <strong
                        className={`block mt-[0.75rem] ${bellefair.className} text-[1.75rem] text-figma-white`}
                        >
                            {travel}
                        </strong>
                    </p>
                </div>
            </div>
        </div>
    )
}
