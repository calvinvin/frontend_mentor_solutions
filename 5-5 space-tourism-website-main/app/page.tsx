/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import Header from "@/ui/header";
import { barlow, barlow_condensed, bellefair } from "@/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Home',
}

export default function Home() {
  return (
    <div
    className={`${barlow.className} min-h-svh bg-no-repeat bg-cover bg-center grid grid-rows-[auto_1fr]
    bg-[url(/assets/home/background-home-desktop.jpg)]
    max-[960px]:bg-[url(/assets/home/background-home-tablet.jpg)]
    `}
    >
      <Header currentPage="home"></Header>
      <main>
        <Hero></Hero>
      </main>
    </div>
  )
}

const backgroundImagePath = {
  'desktop': '/assets/home/background-home-desktop.jpg',
  'tablet': '/assets/home/background-home-tablet.jpg',
  'mobile': '/assets/home/background-home-mobile.jpg',
};

function Hero () {
  return (
  <div
  className={`h-full pb-[128px] mx-auto w-[min(1110px,100%-80px*2)] grid grid-cols-2 items-end justify-center
    max-[960px]:grid-cols-none max-[960px]:content-between max-[960px]:text-center max-[960px]:h-full max-[960px]:py-[8rem] max-[960px]:gap-[32px]
  `}
  >
    <HeroText></HeroText>
    <HeroButton></HeroButton>
  </div>
  )
}
function HeroText () {
  return (
    <div>
      <h1 className={`${barlow_condensed.className} text-figma-blue-300 text-[1.75rem] tracking-[4px] uppercase
      max-[560px]:text-[1rem]
      `}
      >
        so, you want to travel to 
        <em className={`${bellefair.className} text-figma-white block not-italic uppercase text-[9rem] leading-none
        max-[960px]:my-[1.5rem] 
        max-[560px]:text-[5rem]
        `}>
          space
        </em>
      </h1>
      <p className="text-figma-blue-300 text-[1.125rem] leading-[1.8]
      max-[960px]:text-[1rem]
      max-[560px]:text-[0.9375rem]">
        Let’s face it; if you want to go to space, you might as well genuinely go to 
        outer space and not hover kind of on the edge of it. Well sit back, and relax 
        because we’ll give you a truly out of this world experience!
      </p>
    </div>
  );
} 
function HeroButton () {
  return(
    <Link href="./destination"
    className="place-self-end w-[17rem] aspect-square grid place-content-center rounded-[50%] bg-figma-white outline-[0px] outline-figma-white/[.1] outline-solid
    group hover:outline-[5.5rem] transition-[outline-width] duration-500 max-[960px]:place-self-center
    max-[560px]:w-[9rem]"
    >
      <span
      className={`${bellefair.className} text-[2rem] uppercase text-figma-blue-900
      group-hover:opacity-50 transition-[opacity] duration-500
      max-[560px]:text-[1.125rem]`}
      >
        explore
      </span>
    </Link>
  );
}

