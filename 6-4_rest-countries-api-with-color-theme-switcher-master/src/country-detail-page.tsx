import { Link, useParams } from "react-router";
import { fetchAndSetCountryByName } from "./utilities";
import { SetStateAction, useEffect, useState } from "react";
import { ICountry } from "./definitions";


function CountryFlag({src}: {src: string}) {
    if (!src) return <></>;
    return (
        <img className="max-[760px]:max-w-[30rem] mx-auto w-full shadow-[0px_0px_12px_8px_var(--clr-shadow)]" src={src} alt="">
        </img>
    );
}

function CountryDetail({country}: {country: ICountry}) {
    const { name: {official, nativeName}, population, region, subregion, capital, tld, currencies, languages, borders } = country;
    const currencyAbbreviations = Object.keys(currencies);
    const languageNames = Object.values(languages);
    const nativeNameOfficial = Object.values(nativeName)[0].official;

    const propertyKeys = ['Native Name', tld && 'Top Level Domain', 'Population', 'Currencies', 'Region', 'Languages', 'Sub Retion', 'Capital'];
    const propertyValues = [nativeNameOfficial, tld && tld.join(", "), population, currencyAbbreviations, region, languageNames, subregion, capital];

    async function getBorderCountries(borderCountryCodes: string[], setBorderCountries: React.Dispatch<SetStateAction<ICountry[]|null>>) {
        const queryBorderCountryCodes = borderCountryCodes.join(",");
        const responseBorderCountries = await fetch(`https://restcountries.com/v3.1/alpha?codes=${queryBorderCountryCodes}`);
        const jsonBorderCountries = await responseBorderCountries.json();
        setBorderCountries(jsonBorderCountries);
    }
    const [ borderCountries, setBorderCountries ] = useState<ICountry[]|null>(null);
    useEffect(()=>{
        if (borders) getBorderCountries(borders, setBorderCountries);
    }, [borders]);

    return (
        <div className="py-[2.5rem] @container/detail">
            <h1 className="text-[2rem] font-fm-extrabold leading-[1.3]" aria-label="Country Name">{official}</h1>
            <ul className="grid grid-cols-2 gap-y-[1rem] mt-[2rem] @max-[400px]/detail:grid-cols-1" role="list">
                {
                    Array.from({length: propertyKeys.length}).map((_,i)=>{
                        const propertyKey = propertyKeys[i];
                        if (!propertyKey) return;
                        const propertyValue = propertyValues[i];
                        return (
                            <li key={propertyKey} 
                            className={`${(['Native Name', 'Capital'].includes(propertyKey)) && "col-span-2 @max-[400px]/detail:col-span-1"} 
                            ps-[1rem]`}
                            >
                                <h2 className="font-fm-bold inline">{propertyKey}: </h2>
                                <span className="ms-[1rem]">{propertyValue}</span>
                            </li>
                        )
                    }
                )}
            </ul>
            <div className="ps-[1rem] mt-[3rem]">
                <h2 className="font-fm-bold me-[1rem] mb-[0.5rem] inline-block">BorderCountries: </h2>
                {borderCountries
                    ? 
                    <nav>
                        <ul role="list" className="flex flex-wrap">
                            {borderCountries.map((borderCountry: ICountry)=>
                                <li key={borderCountry.cca3}>
                                    <Link
                                    to={`/detail/${borderCountry.name.official}`}
                                    className="shrink-0 grid place-content-center m-[0.25rem] px-[1rem] py-[0.25rem] rounded-[4px] bg-[var(--clr-element)] shadow-[0px_0px_8px_1px_var(--clr-shadow)]
                                    hover:bg-[var(--clr-shadow)] hover:shadow-[0px_0px_6px_0px_var(--clr-element)]
                                    [transition:background-color_0.1s,box-shadow_0.1s]"
                                    >
                                        {borderCountry.name.common}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                    : 
                    "none."
                }
            </div>
        </div>
    );
}

export default function CountryDetailPage() {
    const { officialName } = useParams();
    const [ countryData, setCountryData ] = useState<ICountry|undefined>(undefined);

    useEffect(()=>{
        fetchAndSetCountryByName(officialName, setCountryData);
    }, [officialName]);

    if (!countryData) return (
        <main>
            <div className='relative mx-auto mt-[8rem] w-[14rem] aspect-square grid place-content-center text-[2rem] font-fm-extrabold'>
                <span className='opacity-20'>Loading...</span>
                <div className='absolute inset-0 rounded-full border-[hsl(from_var(--clr-element)_h_s_l_/_.8)] border-[1rem] border-t-[var(--clr-shadow)] animate-[spin_1.5s_linear_infinite]'></div>
            </div>
        </main>
    ) ;

    return (
        <main className="p-[clamp(48px,6.1vw,90px)]">
            <button 
            onClick={()=>history.back()}
            className="w-[8.5rem] h-[2.5rem] rounded-[8px] flex gap-[0.5rem] items-center justify-center 
            bg-[var(--clr-element)] shadow-[0px_0px_8px_2px_var(--clr-shadow)] cursor-pointer 
            hover:bg-[var(--clr-shadow)] hover:shadow-[0px_0px_8px_2px_var(--clr-element)]
            [transition:background-color_0.1s,box-shadow_0.1s]
            ">
                <span className="material-symbols-outlined">keyboard_backspace</span>
                <span>Back</span>
            </button>
            <section className="mt-[clamp(0px,-88px+11.7vw,80px)] grid grid-cols-2 gap-[clamp(72px,-8px+10.5vw,144px)] items-center
            max-[760px]:grid-cols-1 max-[760px]:mt-[5rem] max-[760px]:gap-[1.5rem]
            ">
                <CountryFlag src={countryData.flags.svg}/>
                <CountryDetail country={countryData}/>
            </section>
        </main>
    )
}