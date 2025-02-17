import { ICountry } from "../definitions";
import { Link } from "react-router";

function CountryPropertyListItem({
    property, value
}: {
    property: keyof ICountry, 
    value: string
}) {
    return (
        <li className='flex mt-[0.5rem]'>
            <h4 className='capitalize font-fm-bold'>{property}:&nbsp;</h4>
            <p>{value}</p>
        </li>
    )
}

export default function CountryPreviewCard({country}: {country: ICountry}) {
    const { flags: {svg} } = country;
    const properties: Array<keyof ICountry> = ['population', 'region', 'capital'];
    return (
        <li 
        className='
        rounded-[8px] bg-[var(--clr-element)]
        hover:outline-[-webkit-focus-ring-color] hover:outline-[3px] hover:outline-offset-[2px]
        '
        tabIndex={0}
        >
            <Link
            to={`/detail/${country.name.official}`}
            >
                <section>
                    <img src={svg} className='block w-full aspect-[16.5/10] object-cover rounded-t-[8px]' alt=""></img>
                    <div
                    className='p-[1.5rem]'
                    >
                    <h2 className='font-fm-extrabold text-[1.5rem]'>{country.name.official}</h2>
                    <ul className='mt-[1.5rem]'>
                        {properties.map((property)=><CountryPropertyListItem key={`${country.cca3??country.name}-${property}`} property={property} value={country[property] as string}/>)}
                    </ul>
                    </div>
                </section>
            </Link>
        </li>
    )
}