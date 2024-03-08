import Services from '../services/services.js'
import getProducts from '../services/products.js'
import {useEffect, useState, useRef} from 'react'
import {ColorRing} from 'react-loader-spinner'
import { IconTrash } from '@tabler/icons-react';



const UseCart = () => {
    const [product, setProduct] = useState([]);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(true);
    const divRef = useRef(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const [user] = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            if (token) {
                setToken(token);
                const data = await getProducts({ token });
                setProduct(data);
            }
        };
        fetchProduct();
    }, []);

    const Loader = ({ loading, hidden }) => {
        const loader = loading ? "Compra completada" : `Comprando`;
        const spinner = !loading ? <ColorRing /> : `✔`;
        const className = hidden ? 'compra hidden' : 'compra';
        return (
            <div className={className}>
                <h1>{loader}</h1>
                <div>{spinner}</div>
            </div>
        );
    };

    const buy = async (id) => {
        try {
            const data = await Services.buy({ token, idProduc: id });
            if (data) {
                setProduct(prevProducts => prevProducts.filter(product => product.id_moviles !== id));
                setHidden(false);
                setTimeout(() => {
                    setLoading(true);
                    setTimeout(() => {
                        setHidden(true);
                    }, 2000);
                }, 3000);
            }
        } catch (error) {
            console.error('Error al realizar la compra:', error);
        }
    };
    const PrintProduct = ()=>{
        if (product.length > 0) {
            console.log(product);
            return product.map(product => (
               
                <div key={product.id} className='bg-white shadow-lg p-2 shadow-black/50 flex flex-row w-[25rem] rounded-md items-center justify-center gap-5 '>
                    <img src={product.cover} className='size-32' alt={`imagen de ${product.name}`} />
                    <div className=''>
                    <h1 className='text-xl font-bold'>{product.name}</h1>
                    <p><strong className='text-lg font-semibold'>Cantidad: </strong><span className='text-base font-semibold text-green-600'>{product.quantity}</span></p>
                    <p><strong className='text-base font-semibold'>Total: </strong>
                    <span className='text-base font-semibold text-blue-600'>€{product.total}</span></p>
                    </div>
                    <button onClick={() => buy(product.id_moviles)}><span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 p-1 rounded dark:bg-green-900 dark:text-green-300">Comprar</span></button>
                    <button><IconTrash></IconTrash></button>
                </div>
            
            
            ));
        }

    }
    return {
        product,
        Loader,
        hidden,
        loading,
        PrintProduct
    };
};



export default UseCart;