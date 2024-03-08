
import {Header} from '../components/Header.jsx'
import UseCart from '../hooks/useCart.jsx';
import Menu from '../components/menu.jsx';



export default function Cart() {
    const {PrintProduct, loading, hidden, Loader} = UseCart()

    
    return (
        <>
            <Menu></Menu>
            <Loader hidden={hidden} loading={loading} />
            <Header />
            <article className='w-full mx-w-[600px] h-full  flex items-center justify-center '>
                <div className='flex flex-col gap-7 mt-40'>
                <PrintProduct/>
                </div>
            </article>
        </>
    );
}

