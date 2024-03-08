import { useState, useEffect } from 'react'
import smg from '../public/samsung.avif'
import iph from '../public/iphone.avif'
import hp from '../public/hp.avif'
const IMAGENES = [smg, iph, hp]
export default function Slider (){
const [index, setIndex] = useState(0)
useEffect(() => {
    const mainElement = document.querySelector('img.animate-fade-in-right');
    if (mainElement) {
        mainElement.classList.remove('animate-fade-in-right');
        void mainElement.offsetWidth; 
        mainElement.classList.add('animate-fade-in-right');
    }
});


const timeOut = setTimeout(() => {
    if (index === IMAGENES.length - 1) {
        setIndex(0);
    } else {
        setIndex(index + 1);
    }
}, 3000);


    return (
        <img  className='cursor-pointer object-contain aspect-auto  animate-fade-in-right animate-duration-300 transition' src={IMAGENES[index]} alt="" />
    ) 

}