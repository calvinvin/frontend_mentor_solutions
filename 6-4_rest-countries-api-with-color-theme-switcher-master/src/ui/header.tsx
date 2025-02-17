import { Link } from "react-router";
import { TColorScheme } from "../definitions";
import { getTheOtherColorScheme } from "../utilities";

export default function Header({
    colorScheme,
    switchColorScheme,
}: {
    colorScheme: TColorScheme,
    switchColorScheme: ()=>void,
}) {
    const theOtherColorScheme = getTheOtherColorScheme(colorScheme);

    return (
        <header className='flex justify-between items-center px-[5rem] h-[4rem] bg-[var(--clr-element)] max-[760px]:px-[1rem] max-[400px]:px-[0.5rem]
        '
        >
            <Link to="/" className="px-[1rem] h-[calc(100%-0.5rem)] content-center hover:bg-slate-500 rounded-[8px] max-[760px]:px-[1rem] max-[400px]:px-[0.5rem]">
                <h1 className='font-fm-bold text-[1.25rem] max-[760px]:text-[1rem]'>Where in the world?</h1>
            </Link>
            <button onClick={switchColorScheme} className='capitalize px-[1rem] h-[calc(100%-0.5rem)] content-center rounded-[8px] flex items-center gap-[0.5rem] cursor-pointer hover:bg-slate-500 max-[760px]:text-[0.875rem] max-[760px]:px-[0.5rem]'>
                <span className="material-symbols-outlined" style={{fontSize: '1.125rem'}}>{theOtherColorScheme && `${theOtherColorScheme}_mode`}</span>
                <p className="flex gap-[0.5rem] max-[400px]:flex-col max-[400px]:gap-0">
                    <span>{theOtherColorScheme??"Color"}</span>
                    <span>Mode</span>
                </p>
            </button>
        </header>
    );
}