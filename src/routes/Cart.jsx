import {useEffect, useState, useRef} from 'react'
import {Header} from '../components/Header.jsx'
import Services from '../services/services.js'
import getProducts from '../services/products.js'
import {ColorRing} from 'react-loader-spinner'



export default function Cart() {
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

    const PrintProducts = () => {
        if (product.length > 0) {
            return product.map(product => (
                <div key={product.id_moviles}>
                    <h1>{product.nom_moviles}</h1>
                    <p><strong>Cantidad: </strong>{product.quantity}</p>
                    <p><strong>Total: </strong>€{product.total}</p>
                    <button onClick={() => buy(product.id_moviles)}>Comprar</button>
                </div>
            ));
        }
    };

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

    return (
        <>
            <Loader hidden={hidden} loading={loading} />
            <Header />
            <PrintProducts />
        </>
    );
}

