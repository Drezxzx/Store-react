import { useRef, useState } from 'react'
import { login } from '../services/login.js'
import { Link } from 'react-router-dom'
import {StoreIcon} from 'lucide-react'
import { Oval } from 'react-loader-spinner'
import logo from "../public/logo.jpeg"

export default function Login() {
    

    const formRef = useRef(null)
    const [message, setMessage] = useState("")
    const [loading, setLoadig] = useState(true)
    // const [loginUser, setLoginuser]

    const handleClick = async (event) => {
        event.preventDefault()
        setLoadig(false)
        const data = new FormData(formRef.current)
        const loginData = {
            password: data.get('password'),
            username: data.get('name')
        }
        const userData = await login(loginData)
        if (userData.messege) {
            setMessage(userData.messege)

        } else {
            setLoadig(true)
            console.log(userData);
            localStorage.setItem('user', JSON.stringify(userData))
            window.location.href = '/'
        }
    }
    const Printmessage = () => {
        const hidden = message.length > 0 ? "text-lg rounded-md font-semibold fixed top-[100px] bg-red-700 animate-wobble   animate-duration-300 rounded-sm  text-white p-2" : 'rounded-md text-lg rounded-sm font-semibold fixed top-[135px] bg-red-700 animate-wobble  hidden  animate-duration-300  text-white p-2'

        if (message.length > 0) {
            return (
                <p className={hidden} >{message}</p>
            )
        }
    }
    const red = message.length > 0 ? " border text-black focus:outline-nonebg-red-300 p-2 w-full animate-pulse rounded-2xl duration-150 " : " border focus:outline-none border-slate-950 p-2 w-full rounded-2xl text-black  "

    const Button = () =>{
        if(loading){
            return(
                <button className='bg-black p-2 w-44 shadow-sm shadow-black/50 rounded-full hover:bg-black/40 text-white text-base hover:scale-105 hover:transition-all   '>Iniciar sección</button>
            )
        }else{
            return(
                <span className='text-base w-full text-black justify-center items-center font-semibold flex gap-2'><Oval width={35} color='black' secondaryColor='black'></Oval> Iniciando sección...</span>
            )
        }
    }
    return (
        <main className='bg-[#f3f0f0] w-screen    h-screen flex  justify-center text-black
         items-center ' >

            <form ref={formRef} className='flex  flex-col bg-white shadow-md shadow-black/50 justify-center items-center w-[80%] rounded-lg h-[80%] max-w-[600px]  animate-fade-in  md:gap-10 gap-4' onSubmit={handleClick}  >
                <div className='w-full flex justify-center '>
                <Link to={"/"}> <img className='size-24 hover:scale-105 transition shadow-black/35 rounded-full shadow-md' src={logo} alt="" /> </Link>

                </div>
                {/* <Link to={"/"}><img className='w-14 bg-transparent hover:scale-110 transform transition duration-300 ease-in-out ' src={Svg} alt="" /></Link> */}

                <label htmlFor="name" className='flex flex-col gap-4  w-[90%] p-2 font-bold text-center text-xl'>
                    Nombre de usuario
                    <input type="text" className={red} onClick={() => {
                        setMessage("")
                    }} name="name" required />
                </label>
                <label className='flex flex-col w-[90%] font-bold gap-4 text-xl p-2 text-center' htmlFor="password">
                    Contraseña
                    <input type="password" onClick={() => {
                        setMessage("")
                    }} className={red} name="password" required />
                </label>
                <Link to={"/create"}><p className='text-lg font-semibold underline'>Crear Cuenata</p></Link>
                <Printmessage />
                <Button></Button>
            </form>
        </main>

    )
}