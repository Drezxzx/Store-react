import Search from "./Search"

import { Link } from 'react-router-dom'
import RenderCart from "./RenderCart"



export function Header({ message }) {
  
    return (
        <header className="flex  fixed top-[-1px] bottom-0 text-white z-50 bg-[#111315] border-0 w-full h-[5rem] justify-between items-center p-4">
            
            <Search />
            <Link  to={"/"}>
                <h1>DREPHONE</h1>
            </Link>
            <div className={message ? "message" : "not-message"}>
                <RenderCart />
            </div>
        </header>
    );
}
