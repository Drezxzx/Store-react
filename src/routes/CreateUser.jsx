import{useRef, useEffect, useState} from 'react'
import Services from '../services/services.js'
import { Link } from 'react-router-dom'
import {StoreIcon} from 'lucide-react'


export default function Create(){
    const formref = useRef()
    const [message, setMessage] = useState("")
    const handleClick = async(event) =>{
        event.preventDefault()
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
    const red = message.length > 0 ? " text-black focus:outline-nonebg-red-300 p-2 w-full animate-pulse rounded-2xl duration-150 " : "focus:outline-none border-slate-950 p-2 w-full rounded-2xl text-black  "

    const Printmessage = () => {
        const hidden = message.length > 0 ? "text-lg rounded-md font-semibold fixed top-[100px] bg-red-700 animate-wobble   animate-duration-300 rounded-sm  text-white p-2" : 'rounded-md text-lg rounded-sm font-semibold fixed top-[135px] bg-red-700 animate-wobble  hidden  animate-duration-300  text-white p-2'

        if (message.length > 0) {
            return (
                <p className={hidden} >{message}</p>
            )
        }
    }
   
        return (
            <main className='bg-slate-800 w-screen    h-screen flex  justify-center text-white
             items-center ' >
    
                <form ref={formref} className='flex flex-col justify-center items-center w-[80%] rounded-lg h-4/6 max-w-[300px]  animate-fade-in  gap-10' onSubmit={handleClick}  >
                    <div className='w-full flex justify-center '>
                    <Link to={"/"}> <StoreIcon className=' text-red-700 hover:scale-110 transform transition duration-300 ease-in-outtext-red-700' size={90} ></StoreIcon></Link>

                    </div>
                    {/* <Link to={"/"}><img className='w-14 bg-transparent hover:scale-110 transform transition duration-300 ease-in-out ' src={Svg} alt="" /></Link> */}
                    <label htmlFor="username" className='flex flex-col gap-4  w-[90%] p-2 font-bold text-center text-xl'>
                        Username
            <input type="text" name="username" placeholder="Ejemplo" className={red} required/>
        </label>
                    <label htmlFor="name" className='flex flex-col gap-4  w-[90%] p-2 font-bold text-center text-xl'>
                        Email
                        <input type="email" className={red} placeholder='Ejemplo@gmail.com' onClick={() => {
                            setMessage("")
                        }} name="email" required />
                    </label>
                    <label className='flex flex-col w-[90%] font-bold gap-4 text-xl p-2 text-center' htmlFor="password">
                        Contraseña
                        <input type="password" placeholder='*****' onClick={() => {
                            setMessage("")
                        }} className={red} name="password" required />
                    </label>
                    <Link to={"/login"}><p className='text-lg font-semibold underline'>Crear Cuenata</p></Link>
                    <Printmessage />
                    <button className='bg-red-700 p-2 w-44 shadow-sm shadow-red-600 rounded-full hover:bg-red-400 hover:translate-y-1 hover:transition-all  '>Crear cuenta</button>
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