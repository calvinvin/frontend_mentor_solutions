// import { barlow } from "@/ui/fonts";
import { IData } from "@/lib/definitions";
import { getDataJson } from "@/lib/functions"
import { capitalizeString, technologyInTechnologies } from "@/lib/functions";
import { barlow_condensed, bellefair } from "@/ui/fonts";
import Link from "next/link";

function TechnologyTabs( {
    technologyNames, currentTechnology,
}: {
    technologyNames: string[], currentTechnology:string
}) {
    return (
        <nav>
            <ul
            className="flex flex-col gap-[2rem] max-[960px]:flex-row"
            >
                {technologyNames.map((technologyName, index)=>{
                    const params = new URLSearchParams;
                    params.set("technology", technologyName);
                    return (
                        <li key={technologyName}>
                            <Link
                            href={`/technology?${params.toString()}`}
                            className={`${bellefair.className} w-[5rem] aspect-square rounded-[50%] border-[1px] border-figma-white/[.25] text-[2rem] grid place-content-center
                            ${(technologyName === currentTechnology) ? "bg-figma-white text-figma-blue-900" : "text-figma-white hover:border-figma-white transition-[border-color] duration-200" }
                            max-[960px]:w-[3.5rem] max-[960px]:text-[1.5rem]
                            max-[560px]:w-[2.5rem] max-[560px]:text-[1.125rem]
                            `}
                            >
                                {index+1}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default async function Technology ({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { technology } = await searchParams;
    const technologyQuery = capitalizeString(technology);
    console.log(technologyQuery);
    const file = await getDataJson();
    const dataTechnology = (JSON.parse(file) as IData).technology;
    const currentTechnology = technologyInTechnologies(technologyQuery, dataTechnology) ? technologyQuery : 'Launch vehicle';
    const { name, images, description } = dataTechnology.filter(technology=>technology.name===currentTechnology)[0];
    const technologyNames: string[] = dataTechnology.map(technology=>technology.name);
    console.log(currentTechnology);
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
            <div
            className="grid grid-cols-2 items-center gap-[2rem]
            max-[960px]:grid-cols-none  max-[960px]:pt-[64px]
            "
            >
                <div
                className="grid grid-cols-[auto_1fr] gap-[64px]
                max-[960px]:grid-cols-none max-[960px]:justify-items-center max-[960px]:text-center max-[960px]:px-[24px] max-[960px]:gap-[40px]
                "
                >
                    <TechnologyTabs technologyNames={technologyNames} currentTechnology={currentTechnology}></TechnologyTabs>
                    <div className="content-center">
                        <p
                        className={`${bellefair.className} mb-[1rem] text-[2rem] uppercase text-figma-white/50
                        max-[960px]:text-[1.5rem]
                        max-[560px]:text-[1.125rem]`}
                        >
                            the terminology...
                        </p>
                        <h1
                        className={`${bellefair.className} mb-[1.5rem] text-[3.5rem] uppercase text-figma-white
                        max-[960px]:text-[2.5rem] max-[960px]:mb-[1rem]
                        max-[560px]:text-[1.5rem]
                        `}
                        >
                            {name}
                        </h1>
                        <p
                        className=" text-[1.125rem] tracking-[1.8] text-figma-blue-300
                        max-[960px]:text-[1rem]
                        max-[560px]:text-[0.9375rem]
                        "
                        >
                            {description}
                        </p>
                    </div>
                </div>
                <picture className="max-[960px]:order-first ">
                    <source srcSet={images.landscape} media="(max-width: 960px)"></source>
                    <img
                    src={images.portrait.substring(1,)}
                    alt={""}
                    className="block w-full h-full max-h-[600px] min-h-[258px] object-cover max-[960px]:h-auto"
                    ></img>
                </picture>
            </div>
        </main>            
    )
}