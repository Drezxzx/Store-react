import { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'
import Services from '../services/services.js'
import { IconGardenCart,IconCircleCheck } from '@tabler/icons-react'
import {Oval} from 'react-loader-spinner'


export default function ArticleDetail() {
    const { id } = useParams();
    const [isloading, setLoadig] = useState(false)
    const [buy, setBuy] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [phone, setPhone] = useState([]);
    const [token, setToken] = useState()
    const hidden = isloading ? "hidden" : ""
    const buyComplete = buy ? "" : "hidden"  

    const handleClick = async () => {
        setLoadig(true)
        const response = await Services.addToCart({ token, idProduc: id, quantity })
        console.log(response)
        if (response) {
            setBuy(true)
            setLoadig(false)
            setQuantity(0)
            setTimeout(() => {
                setBuy(false)
            }, 2000);
        }

     
    }
   

    useEffect(() => {
        
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                console.log(user);
                setToken(user[0].token);
            } 
            const response = await fetch(`https://api-store-fl2b.onrender.com/phones/${id}`);
            const data = await response.json();
            console.log(data);
            setPhone(data);
        };
        fetchData();
    }, [id]);

    
    const Loader = ({className}) =>{
        if (isloading) {
            return (<span className={className}><Oval height={40} color='black'></Oval> Añadiendo al carrito</span>)
        }
        }

    const App = ()=>{
        if (phone.length > 0){
            return (
                phone.map(individualPhone => (
                    <div key={individualPhone.id} className='w-full h-full flex  justify-center items-center flex-col lg:flex-row'>
                        <div className='flex  flex-col lg:flex-row  gap-3  items-center justify-center'>
                            <div className=' flex flex-col gap-4 items-center justify-center'>
                            <h1 className='text-3xl md:text-4xl lg:text-5xl  font-bold text-center'>{individualPhone.name}</h1>
                            <img src={individualPhone.cover} className='size-60 md:size-80 lg:size-96 shadow-lg lg:object-contain rounded-lg shadow-black/55' alt={individualPhone.name} />
                            </div>
                            <div className='flex flex-col gap-4 items-center justify-center' >
                            <p className='text-xl lg:text-xl font-semibold text-black/90'>{individualPhone.price}€</p>
                            <p className='text-2xl  font-semibold text-wrap max-w-80 w-72 lg:max-w-96 lg:w-96 text-black'>{individualPhone.description}</p>
                            <label className='flex gap-3  items-center' ><span className='text-xl text-black/70 font-bold'>Cantidad</span>
                                <input type="number" className='p-2 w-16 lg:w-20 font-semibold border rounded-md shadow-sm text-red-500 shadow-black/60 focus:outline-none focus:scale-110' value={quantity} min={0} onChange={(e) => setQuantity(e.target.value)} placeholder="quantity" id="quantity" name="quantity" />

                            </label>
                            <div className='relative'>
                            <span className={`${buyComplete} flex flex-row items-center justify-center gap-2 mb-2`}> <span className='animate-fade-in-right animate-duration-700'>Añadido con exitó!</span> <IconCircleCheck className='text-green-700 animate-blink animate-duration-700 animate-delay-500' size={30}  ></IconCircleCheck> </span>
                            <Loader className={`flex  animate-pop text-base font-semibold flex-col items-center justify-center text-black`}></Loader>
                            {token ? <button disabled={QuantityCorrect} className={`${hidden} disabled:bg-slate-500 flex  gap-3 justify-center items-center bg-black text-white p-2 rounded-full w-64 hover:bg-black/80 transition hover:scale-110 disabled:hover:scale-100 active:scale-110 font-bold`} onClick={handleClick}>Add to cart <IconGardenCart size={20}></IconGardenCart> </button> : <Link className='text-lg font-semibold text-black/80 underline' to={"/login"}>Iniciar sección para poder comprar</Link> }
                            </div>
                            </div>
                            
                        </div>

                    </div>
                ))
            )
        }else{
            return (

                <div className='flex mt-40 flex-col items-center justify-center w-screen h-screen'><Oval color='black' secondaryColor='black'></Oval> Cargando producto...</div>
            )
        }
    }
    const QuantityCorrect = quantity > 0 ? false : true
    return (
        <article className='animate-fade-in  md:ml-[13rem]  md:mt-[9rem]  lg:ml-[15rem]  mt-[5rem] max-w-screen-sm lg:max-w-screen-lg p-2 lg:mt-1 w-[24rem] h-full flex justify-center lg:w-full items-center md:p-0'>
                <App></App>
            </article>
    )
}