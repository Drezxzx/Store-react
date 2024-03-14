import Search from "./Search"
import logo from "../public/logo.jpeg"
import { Link } from 'react-router-dom'
import RenderCart from "./RenderCart"



export function Header({ message }) {
  
    return (
        <header className="flex  fixed top-[-1px] bottom-0 text-white z-50 bg-[#111315] border-0 w-full h-[5rem] justify-between items-center p-4">
            
            <Search />
            <Link  to={"/"}>
                <img className="size-14 object-contain rounded-full shadow shadow-white hover:scale-105" src={logo} alt="" />
            </Link>
            <div className={message ? "message" : "not-message"}>
                <RenderCart />
            </div>
        </header>
    );
}
