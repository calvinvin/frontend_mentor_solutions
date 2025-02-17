import { useEffect, useState } from 'react';
import './App.css';
import { ICountry } from './definitions';
import {fetchAndSetAllCountries, generatePagination } from './utilities';
import { useSearchParams} from 'react-router';
import Search from './ui/search';
import Filter from './ui/filter';
import Pagination from './ui/pagination';
import CountryAmountPerPage from './ui/country-amount-per-page';
import CountryPreviewCard from './ui/country-preview-card';


function PaginatedCountryPreview() {
  // console.log('Component: PaginatedCountryPreview');
  const defaultPage = 1;
  const defaultRegion = undefined;
  const countryAmountPerPageOptions = [12, 36, 60, 120];
  const defaultCountryAmountPerPage = countryAmountPerPageOptions[0];
  const [ allCountries, setAllCountries ] = useState<ICountry[]|null>(null);
  // const [ allCountriesSet, setAllCountriesSet] = useState<boolean>(false);
  
  const [ searchParams ] = useSearchParams();
  let displayPage = Number(searchParams.get("page")) >= 1 ? Number(searchParams.get("page")) : defaultPage;
  const queryCountriesperpage = searchParams.get("countriesperpage");
  const displayRegion = searchParams.get("region") || defaultRegion;
  const displaySearch = searchParams.get("search")?.toLowerCase() || null;

  const displayCountries = allCountries?.filter((country=>{
    if (displayRegion && displayRegion!=='All' && (country.region!==displayRegion)) return;
    if (displaySearch) {
      const { common: commonName, official: officialName, nativeName } = country.name;
      const names = [ commonName.toLowerCase(), officialName.toLowerCase()];
      if (nativeName){
        Object.values(nativeName).forEach((nativeNameValue: {official: string, common: string})=>{
          names.push(nativeNameValue.official.toLowerCase());
          names.push(nativeNameValue.common.toLowerCase());
        })  
      }
      if (!names.some(name=>name.includes(displaySearch))) return;
    }
    return country;
  }))
  const displayCountryAmountPerPageOptions: Array<number|'all'> = countryAmountPerPageOptions.filter(option=>option< (displayCountries?.length?? 0));
  let displayCountryAmountPerPage: number|'all';
  if (!queryCountriesperpage) displayCountryAmountPerPage = defaultCountryAmountPerPage;
  else if (queryCountriesperpage==='all') displayCountryAmountPerPage = 'all';
  else if (queryCountriesperpage > displayCountryAmountPerPageOptions.at(-1)!) displayCountryAmountPerPage = 'all';
  else displayCountryAmountPerPage = Number(queryCountriesperpage);
  displayCountryAmountPerPageOptions.push('all');
  if (displayCountryAmountPerPage!=='all' && displayCountries && (displayPage * displayCountryAmountPerPage  > displayCountries.length)) displayPage = Math.ceil((displayCountries.length-1) / displayCountryAmountPerPage) || 1;
  let paginatedCountries: ICountry[]|undefined;
  let totalPagesAmount: number;
  if (displayCountryAmountPerPage==='all') {
    paginatedCountries = displayCountries;
    totalPagesAmount = 1;
  } else {
    const paginatedCountriesStartIndex = (displayPage-1) * displayCountryAmountPerPage;
    const paginatedCountriesEndIndex = (displayPage) * displayCountryAmountPerPage;
    paginatedCountries = displayCountries?.slice(paginatedCountriesStartIndex, paginatedCountriesEndIndex);
    totalPagesAmount = displayCountries? Math.ceil((displayCountries!.length-1) / displayCountryAmountPerPage) : 1;
  }
  const pages = generatePagination(displayPage, totalPagesAmount);

  useEffect(()=>{
    fetchAndSetAllCountries(setAllCountries);
    // console.log('useEffect: PaginatedCountryPreview, fetching data...')
  }, []);

  return (
    <>
      { displayCountries
        ?
          <>
            <p>
              <span className='opacity-50'>Country amount:</span> 
              <span className='ms-[1rem] border-b-1'>{displayCountries?.length} countries</span>
            </p>
            {
              displayCountries && (displayCountries?.length > defaultCountryAmountPerPage) && <CountryAmountPerPage displayCountryAmountPerPageOptions={displayCountryAmountPerPageOptions} displayCountryAmountPerPage={displayCountryAmountPerPage}/>
            }
            <Pagination pages={pages} displayPage={displayPage}/>
            <ul
            className='
            mt-[2rem] grid [grid-template-columns:repeat(auto-fit,minmax(16.5rem,1fr))] justify-between gap-[4.5rem]
            '
            >
              {paginatedCountries?.map((country: ICountry)=>
                <CountryPreviewCard country={country} key={`CountryPreviewCard-${country.cca3}`}/>
              )}
            </ul>
            <Pagination pages={pages} displayPage={displayPage}/>
          </>
        : 
          <p className='grow bg-red-500 pt-[5rem] text-center text-[5rem]'>Loading...</p> }
    </>
  )
}


export function Preview() {
  // console.log('Component: MainAll');
  
  return (
    <main className='py-[3rem] px-[5rem] h-full grow flex flex-col
    max-[760px]:px-[3rem]
    '>
      <form className='flex justify-between mb-[3rem] max-[760px]:flex-col max-[760px]:gap-[3rem]'>
        <Search />
        <Filter/>
      </form>
      <PaginatedCountryPreview/>
    </main>
  )
}

