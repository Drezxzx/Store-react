import React from "react";
import {IconArrowLeft, IconArrowRight} from '@tabler/icons-react'
export default function ButtonsPages({ elementPerpage, setPages, page }:
    {elementPerpage : number, setPages: Function, page : number}
    ) {
    const buttons : JSX.Element[] = [];
    for (let i = 1; i <= elementPerpage; i++) {
        if (i === page) {
            buttons.push(
                <button key={i} className="text-xl md:text-2xl p-[0.4rem] w-10 lg:text-2xl  font-semibold bg-black/80 text-white transition hover:bg-black/60 rounded-md " onClick={() => setPages(i)}>{i}</button>
            );
        }else{
            buttons.push(
                <button key={i} className="text-xl md:text-2xl p-[0.4rem] w-10 lg:text-2xl font-semibold bg-slate-200 transition hover:bg-black/10 rounded-md " onClick={() => setPages(i)}>{i}</button>
            );
        }
        
    }
    return (
        <div className="flex w-full items-center justify-center md:gap-8 gap-4 ">
            <button className="flex items-center"><IconArrowLeft className=" rounded-md text-black/90 w-7 h-10 md:w-10 hover:bg-black hover:text-white hover:scale-105 transition"></IconArrowLeft> </button>
            {buttons}
            <button className="flex items-center"><IconArrowRight className=" rounded-md text-black/90 w-7 h-10 md:w-10  hover:bg-black hover:text-white hover:scale-105 transition"></IconArrowRight> </button>
        </div>
    );
}


