import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";

function FilterListItem({
    region, 
    handleClickFilterListItem,
}: {
    region: string,
    handleClickFilterListItem: ()=>void,
}) {
    const [ searchParams ] = useSearchParams();
    const newSearchParams = new URLSearchParams(searchParams);
    const displayingRegion = searchParams.get('region');
    if (region!==displayingRegion) {
    newSearchParams.set('region', region);
    newSearchParams.delete('page');
    }
    return (
        <li 
        key={region}
        className='
        '
        >
            <Link
            to={`/?${newSearchParams.toString()}`}
            className='block w-full px-[1rem] py-[0.5rem] text-start rounded-[8px]
            hover:bg-[var(--clr-shadow)]'
            onClick={handleClickFilterListItem}
            >
                {region}
            </Link>
        </li>
    );
}

export default function Filter() {
    const [ filterShown, setFilterShown ] = useState<boolean>(false);
    function switchFilterShown() {
        setFilterShown(!filterShown);
    }
    const [ searchParams ] = useSearchParams();
    const displayRegion = searchParams.get('region') || undefined;  
    const regions = [
        'Africa',
        'Americas',
        'Antarctic',
        'Asia',
        'Europe',
        'Oceania',
        'All',
    ]
    const handleClickFilterListItem = ()=>setFilterShown(false);
    function closeFilterSectionByClickOutside(e: MouseEvent) {
        if (!(e.target as HTMLElement).closest("#filter-section")) setFilterShown(false);
    }
    useEffect(()=>{
        window.addEventListener('click', closeFilterSectionByClickOutside);
        return ()=>window.removeEventListener('click', closeFilterSectionByClickOutside);
    }, []);

    return (
        <section
        className='relative h-[3.5rem] w-[12.5rem] z-10 rounded-[8px] shadow-[0px_0px_8px_4px_var(--clr-shadow)] hover:shadow-[0px_0px_8px_0px_var(--clr-element)] [transition:box-shadow_0.1s]'
        id="filter-section"
        >
            <button
            className='h-full w-full p-[0.5rem] rounded-[8px] flex items-center justify-center gap-[1rem] bg-[var(--clr-element)] cursor-pointer hover:bg-[var(--clr-shadow)] [transition:background-color_0.1s]'
            tabIndex={0}
            onClick={switchFilterShown}
            type="button"
            >
                {displayRegion?? "Filter by Region"}
                <span className={`material-symbols-outlined ${filterShown ? "rotate-180" : ""}`}>keyboard_arrow_down</span>
            </button>
            <ul
            className={`${filterShown ? "block" : "hidden"} 
            mt-[5px] p-[0.5rem] rounded-[8px] bg-[var(--clr-element)]
            `}
            >
                {regions.map(region=><FilterListItem key={region} region={region} handleClickFilterListItem={handleClickFilterListItem}/>)}
            </ul>
        </section>
    );
}