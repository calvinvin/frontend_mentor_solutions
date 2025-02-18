import { FormEvent } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";


function GotopageButton ({
    newSearchParams,
}: {
    newSearchParams: URLSearchParams
}) {
    const navigate = useNavigate();
    function handlePageFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const inputs = form.elements;
        for (let i=0; i < inputs.length; i++) (inputs[i] as HTMLInputElement).blur();
        const formData = new FormData(form);
        const pageQuery = formData.get("gotopage") as string;
        if (pageQuery && (!isNaN(Number(pageQuery)))) {
            console.log(pageQuery);
            form.reset();
            newSearchParams.set('page', pageQuery);
            navigate(`/?${newSearchParams.toString()}`);
        }
    }
    function handleInputBlur(e: React.SyntheticEvent<HTMLInputElement, FocusEvent>){
        const inputElement = e.target as HTMLInputElement;
        const formElement = inputElement.parentElement as HTMLFormElement;
        formElement.requestSubmit();
    }

    return (
        <form className="relative h-[3rem] aspect-square"
        onSubmit={handlePageFormSubmit}>
            <input
            className={`p-[0.5rem] text-center justify-center h-full w-full font-fm-bold border-[2px] border-[var(--clr-element)] cursor-pointer *:h-full focus:placeholder:opacity-0`}
            name='gotopage'
            type='text'
            inputMode="numeric"
            enterKeyHint="go"
            placeholder="..."
            onBlur={handleInputBlur}
            >
            </input>
        </form>
    )
}

function PageLink({
    page, pageIndex, displayPage, totalPagesAmount,
}: {
    page: number|string, pageIndex: number, displayPage: number, totalPagesAmount: number,
}) {
    const [ searchParams ] = useSearchParams();
    const newSearchParams = new URLSearchParams(searchParams);
    if (typeof page === 'number') {
        newSearchParams.set('page', page.toString());  
    }

    return (
        <li key={page}>
        {
            typeof page === 'number'
            ?
                <Link
                to={`/?${newSearchParams.toString()}`}
                className={`grid place-content-center h-[3rem] aspect-square font-fm-bold border-[2px] border-[var(--clr-element)] cursor-pointer hover:bg-[var(--clr-shadow)] [transition:background-color_0.1s]
                ${pageIndex===0 ? "rounded-l-[8px]" : ""}
                ${pageIndex===totalPagesAmount-1 ? "rounded-r-[8px]" : "'"}
                ${page===displayPage ? "text-amber-600" : ""}
                `}
                >
                    {page}
                </Link>
            :
                <GotopageButton newSearchParams={newSearchParams}/>
        }
        </li>
    )
}

export default function Pagination({
pages, displayPage,
}: {
    pages: Array<number|string>,
    displayPage: number,
}) {
    const totalPagesAmount = pages.length;
        
    return (
        <nav className='mt-[3rem]'>
            <ol className='w-fit mx-auto flex'>
                {/* {(currentPage !== 1) && <li><button className="cursor-pointer font-fm-bold">{"<"}</button></li> } */}
                {pages.map((page, pageIndex)=><PageLink key={`page${pageIndex}`} page={page} pageIndex={pageIndex} displayPage={displayPage} totalPagesAmount={totalPagesAmount}/>)}
                {/* {(currentPage !== totalPagesAmount) && <li><button className="cursor-pointer font-fm-bold">{">"}</button></li> } */}
            </ol>
        </nav>
    )
}