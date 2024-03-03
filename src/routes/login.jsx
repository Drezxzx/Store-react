import { useRef, useState } from 'react'
import { login } from '../services/login.js'
import { Link } from 'react-router-dom'
import {StoreIcon} from 'lucide-react'

export default function Login() {
    

    const formRef = useRef(null)
    const [message, setMessage] = useState("")
    // const [loginUser, setLoginuser]

    const handleClick = async (event) => {
        event.preventDefault()
        const data = new FormData(formRef.current)
        const loginData = {
            password: data.get('password'),
            username: data.get('name')
        }
        const userData = await login(loginData)
        if (userData.messege) {
            setMessage(userData.messege)

        } else {
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
    const red = message.length > 0 ? " text-black focus:outline-nonebg-red-300 p-2 w-full animate-pulse rounded-2xl duration-150 " : "focus:outline-none border-slate-950 p-2 w-full rounded-2xl text-black  "
    return (
        <main className='bg-slate-800 w-screen    h-screen flex  justify-center text-white
         items-center ' >

            <form ref={formRef} className='flex flex-col justify-center items-center w-[80%] rounded-lg h-4/6 max-w-[300px]  animate-fade-in  gap-10' onSubmit={handleClick}  >
                <div className='w-full flex justify-center '>
                <Link to={"/"}> <StoreIcon className=' text-red-700 hover:scale-110 transform transition duration-300 ease-in-outtext-red-700' size={90} ></StoreIcon></Link>

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
                <button className='bg-red-700 p-2 w-44 shadow-sm shadow-red-600 rounded-full hover:bg-red-400 hover:translate-y-1 hover:transition-all  '>Iniciar Sesion</button>
            </form>
        </main>

    )
}