import{useRef, useEffect, useState} from 'react'
import Services from '../services/services.js'
import { Link } from 'react-router-dom'
import {StoreIcon} from 'lucide-react'
import logo from '../public/logo.jpeg'
import { Oval } from 'react-loader-spinner'


export default function Create(){
    const formref = useRef()
    const [message, setMessage] = useState("")
    const [loading, setLoadig] = useState(true)
    const handleClick = async(event) =>{
        event.preventDefault()
        setLoadig(false)
        const data = new FormData(formref.current)
        const dataUser = Object.fromEntries(data)
        console.log(dataUser.password);
        if(dataUser){
           const data = await Services.createUser(dataUser)
            if (data) {
                localStorage.setItem('user', JSON.stringify(data))
                 window.location.href = '/'
            }
        }
    }
    const red = message.length > 0 ? "border text-lg font-semibold text-black focus:outline-nonebg-red-300 p-2 w-full animate-pulse rounded-2xl duration-150 " : " border font-semibold focus:outline-none border-slate-950 text-lg p-2 w-full rounded-2xl text-black  "

    const Printmessage = () => {
        const hidden = message.length > 0 ? " text-lg rounded-md font-semibold fixed top-[100px] bg-red-700 animate-wobble   animate-duration-300 rounded-sm  text-white p-2" : 'rounded-md text-lg rounded-sm font-semibold fixed top-[135px] bg-red-700 animate-wobble  hidden  animate-duration-300  text-white p-2'

        if (message.length > 0) {
            return (
                <p className={hidden} >{message}</p>
            )
        }
    }
        const Button = () =>{
            if(loading){
                return(
                    <button className='bg-black p-2 w-44 shadow-sm shadow-black/50 rounded-full hover:bg-black/40 text-white text-base hover:scale-105 hover:transition-all   '>Crear cuenta</button>
                )
            }else{
                return(
                    <span className='text-base w-full text-black justify-center items-center font-semibold flex gap-2'><Oval width={35} color='black' secondaryColor='black'></Oval> creando cuenta</span>
                )
            }
        }
        return (
            <main className='bg-[#f3f0f0] w-screen    h-screen flex  justify-center text-white
             items-center ' >
    
                <form ref={formref} className='flex  flex-col bg-white shadow-md shadow-black/50 justify-center items-center w-[80%] rounded-lg h-[80%] max-w-[600px]  animate-fade-in  md:gap-3 gap-4' onSubmit={handleClick}  >

                    <div className='w-full flex justify-center '>
                    <Link to={"/"}> <img className='size-24 hover:scale-105 transition shadow-black/35 rounded-full shadow-md' src={logo} alt="" /></Link>

                    </div>
                    {/* <Link to={"/"}><img className='w-14 bg-transparent hover:scale-110 transform transition duration-300 ease-in-out ' src={Svg} alt="" /></Link> */}
                    <label htmlFor="username" className='flex  text-black flex-col gap-4  w-[90%] p-2 font-bold text-center text-xl'>
                        Username
            <input type="text" name="username" placeholder="Ejemplo" className={red} required/>
        </label>
                    <label htmlFor="name" className='flex text-black flex-col gap-4  w-[90%] p-2 font-bold text-center text-xl'>
                        Email
                        <input type="email"  className={red} placeholder='Ejemplo@gmail.com' onClick={() => {
                            setMessage("")
                        }} name="email" required />
                    </label>
                    <label className='flex flex-col w-[90%] text-black font-bold gap-4 text-xl p-2 text-center' htmlFor="password">
                        Contraseña
                        <input type="password" placeholder='*****' onClick={() => {
                            setMessage("")
                        }} className={red} name="password" required />
                    </label>
                    <Link to={"/login"}><p className='text-lg text-black font-semibold underline'>Iniciar Sección</p></Link>
                    <Printmessage />
                    <Button></Button>
                </form>
            </main>
    
        )
        // <form ref={formref} onSubmit={handleClick}>
        // <label htmlFor="username">
        //     <input type="text" name="username" placeholder="Nombre de usuario" required/>
        // </label>
        // <label htmlFor="email">
        //     <input type="text" name="email" placeholder="Ejemplo@ejemplo.com" required/>
        // </label>
        // <label htmlFor="password">
        //     <input type="password" name="password" placeholder="******" required/>
        // </label>
        // <button>Iniciar Sesion</button>
        // </form>
    
   
}