import { bellefair, barlow_condensed } from "@/ui/fonts";
import Image from "next/image";
import { IData } from "@/lib/definitions";
import Link from "next/link";
import { capitalizeString, planetInDestinations } from "@/lib/functions";
import { getDataJson } from "@/lib/functions";

export default async function Destination(
    { 
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
) {
    const file = await getDataJson();
    const dataDestinations = (JSON.parse(file) as IData).destinations;
    const { planet }  = await searchParams;
    const planetQuery = capitalizeString(planet);
    const currentPlanet = planetInDestinations(planetQuery, dataDestinations) ? planetQuery : 'Moon';
    const destination = dataDestinations.filter(destination => destination.name===currentPlanet)[0];
    const { name, images, description, distance, travel } = destination;

    function PlanetTabs() {
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
                    <PlanetTabs></PlanetTabs>
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
        </main>
    )
}