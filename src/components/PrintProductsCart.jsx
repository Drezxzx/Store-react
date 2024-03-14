import { IconCheck, IconCheckbox, IconTrash } from '@tabler/icons-react';
import Services from '../services/services.js'
import CheckOut from './CheckOut.tsx'
import getProducts from '../services/products.js'
import { useEffect, useState } from 'react'
import { ColorRing, Oval } from 'react-loader-spinner'

const PrintProduct = () => {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");
    const [productsLenght, setProductsLenght] = useState(0)
    const [pageLoading, setPageLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [totalWith, setTotalWith] = useState(0)
    const [buyall, setBuyAll] = useState(false)
    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            const [user] = JSON.parse(localStorage.getItem('user'));
            const userToken = user?.token;
            
            if (userToken) {
                setToken(userToken);
                const data = await getProducts({ token: userToken });
                if (data) {
                    setPageLoading(false)
                }
                setProducts(data);
            }
        };
        fetchProduct();
    }, []);

    useEffect(() => {
        if (token.length > 0){
            Services.getTotal({token: token})
            .then(res => {
                const formatEuro = convertToEuro(res.total);
                const totalConEnvio = convertToEuro(res.total + 10);
                setProductsLenght(res.productos)
                setTotalWith(totalConEnvio)
                setTotal(formatEuro)
            })
            .catch(error => {
                console.error('Error al obtener el total:', error);
            });
        }
    }, [token]);

    const convertToEuro = (value) =>{
        return value.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR'
        });
    }

    const buy = async (id, setLoading, setHidden) => {
        setLoading(true);
        
        try {
            const data = await Services.buy({ token, idProduc:id });
            if (data) {
                setLoading(false);
                setHidden(false);
                setTimeout(() => {
                    updateProduct(id);
                    setHidden(true);
                }, 2000);
            }
        } catch (error) {
            console.error('Error al realizar la compra:', error);
        }
    };

    const buyAll = async()=>{
        setHidden(false);
        setBuyAll(true);
        try {
            const data = await Services.buyAll({token});
            if (data) {
                setBuyAll(false);
                setTimeout(() => {
                    setProducts([]);
                    setHidden(true);
                }, 2000);
            }
        } catch (error) {
            console.error('Error al realizar la compra:', error);
        }
    }

    const deleteFromCart = async(id) =>{
        try {
            const data = await Services.deleteFronTheCart({token, idProduc : id})
            if (data) {
                updateProduct(id);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const updateProduct = (id) => {
        const newProducts = products.filter(product => product.id !== id);
        setProducts(newProducts);
    };

    const Card = ({item})=>{
        const [loading, setLoading] = useState(false);
        const [hidden, setHidden] = useState(true);

        return(
            <div key={item.id} className='bg-white shadow-lg p-1 flex-col  shadow-black/50 flex md:flex-row w-full rounded-md items-center relative justify-center gap-5 '>
                {loading && <div className='w-full h-full bg-slate-400/50 backdrop-blur flex items-center justify-center absolute text-base animate-fade-in animate-duration-400 text-black font-semibold'><Oval></Oval> Comprando...</div>}
                {!loading && !hidden && <div className='w-full h-full bg-slate-400/50 backdrop-blur flex items-center justify-center absolute text-base animate-fade-in animate-duration-400 text-black font-semibold'>Compra realizada con éxito <IconCheckbox color='green'></IconCheckbox></div>}
                <img src={item.cover} className='size-32' alt={`imagen de ${item.name}`} />
                <div className='md:w-52 w-[80%] flex flex-col items-center justify-center md:items-start  gap-1 md:gap-0'>
                    <h1 className='text-lg font-bold'>{item.name}</h1>
                    <p><strong className='text-base font-semibold'>Cantidad: </strong><span className='text-base font-semibold text-green-600'>{item.quantity}</span></p>
                    <p><strong className='text-base font-semibold'>Total: </strong>
                        <span className='text-base font-semibold text-blue-600'>€{item.total}</span></p>
                </div>
                <button className='hover:scale-110 transition' onClick={() => buy(item.id, setLoading, setHidden)}><span className="hover:bg-green-600 hover:text-white/80 shadow-md shadow-green-700/80 text-xs font-medium me-2 px-2.5 p-3 lg:p-2 rounded bg-green-900 text-green-300">Comprar</span></button>
                <button onClick={() => deleteFromCart(item.id)}  className='bg-red-700 hover:bg-red-600  rounded shadow-sm shadow-red-700/80  hover:scale-110 transition p-1 '><IconTrash className='text-red-200 hover:text-white/80'></IconTrash></button>
            </div>
        )
    }

    const Product = products.map(item => (
        <Card item={item} key={item.id}></Card>
    ));
    const className = hidden ? 'hidden' : '';
    const Text = buyall ? <span className='bg-slate-100 rounded shadow-lg w-60 flex flex-col items-center justify-center p-5'><Oval color='black' secondaryColor='black'></Oval> Comprando todo...</span> :<span className='bg-slate-100 rounded shadow-lg w-60 flex flex-col items-center justify-center p-5'><IconCheckbox color='green'></IconCheckbox> Compra completada.</span> ;
    const App = ()=>{
        if (products.length > 0) {
            return (
                <article className='flex flex-col-reverse gap-6  lg:flex-row-reverse w-full relative justify-center items-center  h-full'>
                    <div className={`w-screen ${className} h-screen absolute bg-slate-400/50 backdrop-blur flex justify-center items-center z-40`}>{Text}</div>
                    <div className='flex justify-center items-center overflow-auto  lg:mt-36 h-fit p-3  flex-col gap-5 w-full  lg:w-[40%] rounded'>
                        {Product}
                    </div>
                    <div className='md:mt-36 mt-32 flex items-center justify-center max-h-[30rem]  lg:w-1/2 md:w-[80%] w-full'>
                        <CheckOut products={productsLenght} total={total} totalNeto={totalWith} buyAll={() => buyAll()} ></CheckOut>
                    </div>
                </article>
            )
        } else {
            return (
                <article className='w-screen  h-screen mt-72 md:mt-48 flex md:justify-center md:items-center'>
                    <h1 className='text-3xl font-bold text-black'>No hay productos en El carrito ❌</h1>
                </article>
            )
        }
    }

    return (
        <div>
            {pageLoading && <div className='w-screen h-screen flex flex-col items-center justify-center'><Oval color='black' secondaryColor='blck'></Oval> Cargando...</div> }
            <App></App>
        </div>
    );
};

export default PrintProduct;
