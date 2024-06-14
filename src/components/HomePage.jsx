import { useEffect, useState } from 'react';
import { usePhone } from '../hooks/usePhone.jsx';
import ButtonPage from '../components/ButtonsPage.jsx';
import {Oval} from 'react-loader-spinner'
import CardProduct from './CardProducts.tsx';
import { Link } from 'react-router-dom';
import Slider from './Slider.jsx';
import Menu from './menu.jsx';
export default function Main() {
    const { movile, pages, setPages, totalPages, isloading } = usePhone();
   
    const Buttons = ()=>{
        return(
            <div>
                {totalPages && <ButtonPage page={pages} setPages={setPages} elementPerpage={totalPages}></ButtonPage>}
            </div>
        )
    }

    const App = ()=>{
        
        if (isloading) {
            return  <div className='mt-40 w-full flex h-screen items-center justify-center flex-col gap-2'><Oval color='black' secondaryColor='black'></Oval> Cargando productos</div>
        }else{
            return (<main className='mt-[5rem] relative flex flex-col gap-5 justify-center items-center p-2 mg:p-0'>
            <Menu></Menu>
            <Slider></Slider>
            
            <article className='animate-fade-in-down flex flex-col gap-5 md:grid md:gap-7 md:grid-cols-2 lg:grid lg:grid-cols-3 lg:gap-24 items-center justify-center'>
               
                {movile?.map(phone => (
                    <Link key={phone.id} className='flex flex-col-reverse items-center justify-center' to={`/phone/${phone.id}`}>
                        <CardProduct valoration={phone.valoration} key={phone.id} img={phone.cover} price={phone.price} tittle={phone.name}></CardProduct>
                    </Link>
                ))}
               
            </article>
            
        </main>)
        }
        
    }
    useEffect(() => {
        const mainElement = document.querySelector('article.animate-fade-in-down');
        if (mainElement) {
            mainElement.classList.remove('animate-fade-in-down');
            void mainElement.offsetWidth; 
            mainElement.classList.add('animate-fade-in-down');
        }
    });
    useEffect(()=>{
        const withBody = window.innerWidth
        const isInHome = window.location.pathname === "/"
        const body = document.querySelector("body")
        if (withBody > 700) {
            body.style.overflow = "auto"
        }
        if (isInHome) {
            body.style.overflow = "auto"
        }
    },[])
    return (
        <>
        <App></App>
        <div className='w-screen flex items-center justify-center'>
        <Buttons></Buttons>
        </div>
        </>
        
        
    );
}
