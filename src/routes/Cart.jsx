
import { useEffect } from 'react';
import {Header} from '../components/Header.jsx'

import Menu from '../components/menu.jsx';

import PrintProduct from '../components/PrintProductsCart.jsx';
import Footer from '../components/Footer.jsx';

export default function Cart() {
    useEffect(()=>{
        const url = window.location.href
        const isInUrl = url.includes('cart')
        if(isInUrl){
            document.title = 'Carrito'
            
        }

    },[])


    
    return (
        <>
            <Menu></Menu>
            <Header />
            <div className='h-fit'>
            <PrintProduct></PrintProduct>

            </div>
           
        </>
    );
}

