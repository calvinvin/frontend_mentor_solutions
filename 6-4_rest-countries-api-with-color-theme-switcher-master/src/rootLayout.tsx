import { useState, useEffect } from "react";
import { TColorScheme } from "./definitions";
import { getCurrentColorScheme, addListenerToPrefersColorSchemeToChangeCurrentColorScheme, removeListenerToPrefersColorSchemeToChangeCurrentColorScheme, getTheOtherColorScheme } from "./utilities";
import Header from "./ui/header";
import { Outlet } from "react-router";

export default function RootLayout() {
    const [ colorScheme, setColorScheme ] = useState<TColorScheme>(undefined);
    // console.log('Component: RootLayout');
    useEffect(()=>{
        setColorScheme(getCurrentColorScheme());
        addListenerToPrefersColorSchemeToChangeCurrentColorScheme(setColorScheme);
        // console.log('useEffect: RootLayout');
        return ()=>removeListenerToPrefersColorSchemeToChangeCurrentColorScheme(setColorScheme);
    }, []);
    return (
        <>
        <div 
        className={`${colorScheme}
            [--clr-background:var(--color-fm-Very-Light-Gray-Light-Mode-Background)] [--clr-text:var(--color-fm-Very-Dark-Blue-Light-Mode-Text)] [--clr-element:var(--color-fm-White-Dark-Mode-Text-and-Light-Mode-Elements)] [--clr-shadow:var(--color-fm-shadow-light-mode)]
            [@media(prefers-color-scheme:dark)]:[--clr-background:var(--color-fm-Very-Dark-Blue-Dark-Mode-Background)] [@media(prefers-color-scheme:dark)]:[--clr-text:var(--color-fm-White-Dark-Mode-Text-and-Light-Mode-Elements)] [@media(prefers-color-scheme:dark)]:[--clr-element:var(--color-fm-Dark-Blue-Dark-Mode-Element)] [@media(prefers-color-scheme:dark)]:[--clr-shadow:var(--color-fm-shadow-dark-mode)]
            light:[--clr-background:var(--color-fm-Very-Light-Gray-Light-Mode-Background)] light:[--clr-text:var(--color-fm-Very-Dark-Blue-Light-Mode-Text)] light:[--clr-element:var(--color-fm-White-Dark-Mode-Text-and-Light-Mode-Elements)] light:[--clr-shadow:var(--color-fm-shadow-light-mode)]
            dark:[--clr-background:var(--color-fm-Very-Dark-Blue-Dark-Mode-Background)] dark:[--clr-text:var(--color-fm-White-Dark-Mode-Text-and-Light-Mode-Elements)] dark:[--clr-element:var(--color-fm-Dark-Blue-Dark-Mode-Element)] dark:[--clr-shadow:var(--color-fm-shadow-dark-mode)]
            [@media(prefers-color-scheme:dark)]:light:[--clr-background:var(--color-fm-Very-Light-Gray-Light-Mode-Background)] [@media(prefers-color-scheme:dark)]:light:[--clr-text:var(--color-fm-Very-Dark-Blue-Light-Mode-Text)] [@media(prefers-color-scheme:dark)]:light:[--clr-element:var(--color-fm-White-Dark-Mode-Text-and-Light-Mode-Elements)] [@media(prefers-color-scheme:dark)]:light:[--clr-shadow:var(--color-fm-shadow-light-mode)]
            [@media(prefers-color-scheme:dark)]:dark:[--clr-background:var(--color-fm-Very-Dark-Blue-Dark-Mode-Background)] [@media(prefers-color-scheme:dark)]:dark:[--clr-text:var(--color-fm-White-Dark-Mode-Text-and-Light-Mode-Elements)] [@media(prefers-color-scheme:dark)]:dark:[--clr-element:var(--color-fm-Dark-Blue-Dark-Mode-Element)] [@media(prefers-color-scheme:dark)]:dark:[--clr-shadow:var(--color-fm-shadow-dark-mode)]
            min-h-screen font-[Nunito_Sans] font-fm-regular
            bg-[var(--clr-background)] text-[var(--clr-text)]
            flex flex-col
        `}
        >
            <Header 
            colorScheme={colorScheme}
            switchColorScheme={()=>setColorScheme(getTheOtherColorScheme(colorScheme))}
            />
            <Outlet />

        </div>
        </>
    )
}