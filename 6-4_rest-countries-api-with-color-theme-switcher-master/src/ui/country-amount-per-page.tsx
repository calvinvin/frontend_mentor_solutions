import { Link, useSearchParams } from "react-router";

function CountryAmountPerPageLink({
    amount, displayCountryAmountPerPage
}: {
    amount: number|'all', displayCountryAmountPerPage: number|'all',
}) {
    const [ searchParams ] = useSearchParams();
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('countriesperpage', amount.toString());
    if (amount!==displayCountryAmountPerPage) newSearchParams.set('page', '1');
    return (
    <li>
        <Link
        to={`/?${newSearchParams.toString()}`}
        className={`cursor-pointer border-b-1
        ${(amount!==displayCountryAmountPerPage) ? "opacity-50" : ""}
        hover:opacity-100
        `}
        // relative after:absolute after:content-[''] after:inset-0 after:border-b-[1px]
        >
            {amount}
        </Link>
    </li>
    );
}


export default function CountryAmountPerPage({
    displayCountryAmountPerPageOptions,
    displayCountryAmountPerPage,
}: {
    displayCountryAmountPerPageOptions: Array<number|'all'>,
    displayCountryAmountPerPage: number|'all',
}) {
    return (
        <div>
            <span className='opacity-50'>Number of countries shown per page: </span>
            <ol className='inline-flex ms-[1rem] gap-[1rem]'>
                {displayCountryAmountPerPageOptions.map((amount: number|'all') =><CountryAmountPerPageLink key={amount} amount={amount} displayCountryAmountPerPage={displayCountryAmountPerPage}/>)}
            </ol>
        </div>
    )
}