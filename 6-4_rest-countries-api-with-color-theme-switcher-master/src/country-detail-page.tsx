import { useParams } from "react-router";
import { fetchAndSetCountryByName } from "./utilities";
import { useEffect, useState } from "react";
import { ICountry } from "./definitions";


function CountryFlag({src}: {src: string}) {
    if (!src) return <></>;
    return (
        <img className="max-[760px]:max-w-[30rem] mx-auto w-full" src={src} alt="">
        </img>
    );
}

function CountryDetail({country}: {country: ICountry}) {
    if (!country) return <></>;
    // console.log(country);
    const { name: {official, nativeName}, population, region, subregion, capital, tld, currencies, languages } = country;
    const currencyAbbreviations = Object.keys(currencies);
    const languageNames = Object.values(languages);
    const nativeNameOfficial = Object.values(nativeName)[0].official;

    const propertyKeys = ['Native Name', tld && 'Top Level Domain', 'Population', 'Currencies', 'Region', 'Languages', 'Sub Retion', 'Capital'];
    const propertyValues = [nativeNameOfficial, tld && tld.join(", "), population, currencyAbbreviations, region, languageNames, subregion, capital];

    return (
        <div className="py-[2.5rem] @container/detail">
            <h2 className="text-[2rem] font-fm-extrabold leading-[1.3]">{official}</h2>
            <div className="grid grid-cols-2 gap-y-[1rem] mt-[2rem] @max-[400px]/detail:grid-cols-1">
                {
                    Array.from({length: propertyKeys.length}).map((_,i)=>{
                        const propertyKey = propertyKeys[i];
                        if (!propertyKey) return;
                        const propertyValue = propertyValues[i];
                        return <p key={propertyKey} className={`${(['Native Name', 'Capital'].includes(propertyKey)) && "col-span-2 @max-[400px]/detail:col-span-1"} ps-[1rem]`}><span className="font-fm-bold">{propertyKey}: </span><span className="ms-[1rem]">{propertyValue}</span></p>
                    }
                )}
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

    if (!countryData) return <></>;

    return (
        <main className="p-[clamp(48px,6.1vw,90px)]">
            <button 
            onClick={()=>history.back()}
            className="w-[8.5rem] h-[2.5rem] rounded-[8px] flex gap-[0.5rem] items-center justify-center bg-[var(--clr-element)] cursor-pointer hover:bg-slate-500">
                <span className="material-symbols-outlined">keyboard_backspace</span>
                <span>Back</span>
            </button>
            <section className="mt-[clamp(0px,-88px+11.7vw,80px)] grid grid-cols-2 gap-[clamp(72px,-8px+10.5vw,144px)] items-center
            max-[760px]:grid-cols-1 max-[760px]:mt-[5rem] max-[760px]:gap-[1.5rem]
            ">
                <CountryFlag src={countryData?.flags?.svg}/>
                <CountryDetail country={countryData}/>
            </section>
        </main>
    )
}