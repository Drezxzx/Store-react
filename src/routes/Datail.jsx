import Menu from '../components/menu.jsx'
import ArticleDetail from '../components/ArticleDetail.jsx';
import { Header } from '../components/Header.jsx';
import { useEffect } from 'react';
import Footer from '../components/Footer.jsx';

export default function DeatialPage() {
   useEffect(()=>{
    const url = window.location.href.includes('phone')
    if (url){
        document.title= "Añadir al carrito"
    }
   }, [])
    return (
        <section className='w-screen h-screen' >
            <Header></Header>
            <Menu></Menu>
            <ArticleDetail></ArticleDetail>
            <Footer></Footer>

        </section>
    );
}
