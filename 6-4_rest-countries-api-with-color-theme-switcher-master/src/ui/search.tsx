import { useNavigate, useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
    const [ searchParams ] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const newSearchParams = new URLSearchParams(searchParams);
    const navigate = useNavigate();

    const handleSearchInput = useDebouncedCallback((e: React.SyntheticEvent<HTMLInputElement, Event>)=>{
        const inputText = (e.target as HTMLInputElement).value;
        newSearchParams.set('search', inputText);
        newSearchParams.delete('page');
        navigate(`/?${newSearchParams.toString()}`);
    } , 300); 

    return (
        <search className='relative
        '
        >
            <span className="material-symbols-outlined absolute left-0 top-[50%] translate-y-[-50%] px-[1rem]">search</span>
            <input 
            onChange={handleSearchInput}
            className='
            w-full h-[3.5rem] ps-[4rem] rounded-[8px] bg-[var(--clr-element)] cursor-pointer text-[1.125rem] placeholder:text-[1rem]
            '
            name='country-name'
            placeholder="Search for a country..."
            defaultValue={searchQuery??""}
            type='search'
            >
            </input>
        </search>
    );
}