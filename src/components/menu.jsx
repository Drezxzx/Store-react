import {useState, useEffect} from 'react'
import svg from  '../assets/menu.svg'
import {Link} from 'react-router-dom'


export default function Menu() {
    const [menuHidden, setMenuHidden] = useState(true)
    const [islogin, setIslogin] = useState(false)
    const logout = () =>{
        if (localStorage.getItem("user")) {
            localStorage.removeItem("user")
            window.location.reload()
        }
    }
    useEffect(()=>{
        const user = localStorage.getItem("user")
        if (user) {
            setIslogin(true)
        }
    },[])
    
    const MenuOptions = () =>{
        const className = menuHidden ? 'menu hidden' : 'menu'
        const userLink = islogin ? <li onClick={logout} style={{cursor : "pointer"}} >Logout</li> : <li><Link to={"/login"}>Iniciar sección</Link></li>
        return (
            <ul className={className} >
               <li><Link to={"/"}>Home</Link></li> 
                <li><Link to={"/cart"}>Cart</Link></li>
                <li><Link to={"/profile"}>Profile</Link></li>
                {userLink}
            </ul>
        )
    }

    return (
        <>
        <div style={{cursor : "pointer"}} onClick={()=>{setMenuHidden(!menuHidden)}}><img src={svg} alt="" /></div>
        <MenuOptions/>
        </>
    )
}