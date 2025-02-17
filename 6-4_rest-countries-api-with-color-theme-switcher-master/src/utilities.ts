import { SetStateAction } from "react";
import { TColorScheme, ICountry } from "./definitions";

export function getTheOtherColorScheme(currentColorScheme: TColorScheme): TColorScheme {
    if (currentColorScheme===undefined) return;
    const newColorScheme = (currentColorScheme==="light") ? "dark" : "light";
    return newColorScheme
}
export function getCurrentColorScheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? "light" : "dark";
}
export function setCurrentColorSchemeToPrefersColorScheme(setColorScheme: React.Dispatch<SetStateAction<TColorScheme>>) {
    setColorScheme(getCurrentColorScheme());
}
export async function fetchAndSetAllCountries(
    setAllCountries: React.Dispatch<SetStateAction<ICountry[]|null>>,
    setAllCountriesSet: React.Dispatch<SetStateAction<boolean>>,
) {
    const response = await fetch("https://restcountries.com/v3.1/all");
    setAllCountries(await response.json());
    setAllCountriesSet(true);
}
export async function fetchAndSetCountryByName(countryName: string|undefined, setCountryData: React.Dispatch<SetStateAction<ICountry|undefined>>) {
    if (!countryName) return;
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    setCountryData(((await response.json()) as Array<ICountry>)[0]);
}
export function addListenerToPrefersColorSchemeToChangeCurrentColorScheme(setColorScheme: React.Dispatch<SetStateAction<TColorScheme>>) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', ()=>{
        setCurrentColorSchemeToPrefersColorScheme(setColorScheme);
    });
}
export function removeListenerToPrefersColorSchemeToChangeCurrentColorScheme(setColorScheme: React.Dispatch<SetStateAction<TColorScheme>>) {
    window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', ()=>{
        setCurrentColorSchemeToPrefersColorScheme(setColorScheme);
    });
}
export function generatePagination(currentPage: number, totalPagesAmount: number) {
    if (totalPagesAmount <= 7) {
        return Array.from({ length: totalPagesAmount }, (_, i)=> i+1);
    }
    if (currentPage <=3) {
        return [1, 2, 3, '...', totalPagesAmount - 1, totalPagesAmount];
    }
    if (currentPage >= totalPagesAmount - 2) {
        return [1, 2, '...', totalPagesAmount - 2, totalPagesAmount - 1, totalPagesAmount];
    }
    return [1, '...', currentPage-1, currentPage, currentPage+1, '...', totalPagesAmount];
}