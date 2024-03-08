import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { IconMenu2, IconX, IconHome, IconUserCircle, IconLogout, IconLogin } from '@tabler/icons-react'

export default function Menu() {
    const [menuHidden, setMenuHidden] = useState(true)
    const [menuactive, setMenuActive] = useState(false)
    const [islogin, setIslogin] = useState(false)
    const [screenWith, setScreenWith] = useState(window.innerWidth)
    useEffect(() => {
        setScreenWith(window.innerWidth)
        const url = document.location.href.split("/").some(url => url === "phone")
        if (!url) {
            setMenuActive(true)
        }else{
            setMenuHidden(false)
        }
        // console.log(ac);

    }
        , []
    )

    const handleClick = ()=>{
        const menu = document.querySelector(".menu")
        console.log(menu);
        setMenuHidden(!menuHidden)
    }
    const logout = () => {
        if (localStorage.getItem("user")) {
            localStorage.removeItem("user")
            window.location.reload()
        }
    }
    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            setIslogin(true)
        }
    }, [])
    const Icon = ({className})=>{
        if(menuHidden){
            return <IconMenu2 className={className} onClick={handleClick}></IconMenu2>
        }else{
            return <IconX className={className} onClick={handleClick}></IconX>
        }
    }
    const menuHiddenClass = menuHidden ? {translate:" translate-x-[-105%] ", animation:"animate-slide-out-right"} : {translate:"", animation:"animate-slide-out-left"}

    const className = { top: 'top-[5rem]', with: "lg:h-full", position: "fixed" }
    
    const userLink = islogin ? <li className='w-24 relative lg:w-28'  style={{ cursor: "pointer" }} ><span onClick={logout} className='flex flex-row gap-2 onClick={logout} hover:text-slate-500/90 hover:scale-110 transition items-center'>
        <IconLogout className='lg:size-24 size-20'></IconLogout> Logout
        </span> 
        <Icon className={'size-10  left-[9.5rem] p-2 w-12 absolute top-6 lg:left-[14.5rem] text-white bg-[#111315] rounded-r-full cursor-pointer hover:scale-105 '}></Icon>
        </li> 
    : <li className='w-24 relative lg:w-28'><Link className='flex items-center flex-row hover:text-slate-500/90 hover:scale-110 transition gap-2' to={"/login"}><IconLogin className='lg:size-24 size-20'></IconLogin>Iniciar sección</Link>
     <Icon className={'size-10  left-[9.5rem] p-2 w-12 absolute top-6 lg:left-[14.5rem] text-white bg-[#111315] rounded-r-full cursor-pointer hover:scale-105 '}></Icon></li>

    const MenuOptions = () => {
        
            return (


                <ul className={` ${menuHiddenClass.translate}    z-20 md:border-t md:border-white/15 md:justify-center lg:text-2xl lg:gap-10 flex flex-col gap-y-10 transition font-bold text-xl p-2 text-white/90 animate-duration-250 lg:justify-start   bg-[#111315] left-0 md:h-screen lg:w-60 ${className.with} w-40 ${className.position} ${className.top} rounded-r-md lg:rounded-bl-sm lg:rounded-tr-none`} >
                    <li className='w-24 lg:w-28 lg:mt-[10rem]' ><Link className='flex flex-row gap-2 items-center hover:text-slate-500/90 hover:scale-110 transition' to={"/"}><IconHome className='lg:size-24 size-20'></IconHome>Home</Link></li>
                    {userLink}
                    {islogin && <li className='w-24 lg:w-28 relative ' >
                        <Link className='flex flex-row gap-2 items-center hover:text-slate-500/90 hover:scale-110 transition' to={"/profile"}><IconUserCircle className='lg:size-24 size-20'></IconUserCircle>Perfil</Link>
                       
                        </li> } 
                </ul>


            )
        

    }

    return (
        <>
            <MenuOptions></MenuOptions>
        </>
    )
}