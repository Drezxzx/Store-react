import React from "react";
import {IconShoppingCartPlus} from '@tabler/icons-react'
import {useState} from 'react'

export default function CardProduct({ img, tittle, price, valoration }: { img: string, tittle: string, price: string, valoration: number }) {
    const [isHovered, setIsHovered] =useState(false);

    const PrinValoration = () => {
      
        
        const valorations: JSX.Element[] = [];
        for (let i = 0; i < valoration; i++) {
            valorations.push(
                <svg key={i} className="w-4 h-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            );
        }
        return valorations;
    };
    const change= ()=>{
      
        setIsHovered(!isHovered);
    } 
    
    const hover = isHovered ? 'flex' : 'hidden';
  
   
    return (
        <div onMouseEnter={change} onMouseLeave={change} className="w-full transition relative max-w-sm bg-white hover:shadow-lg hover:shadow-slate-500  rounded-lg shadow-sm  shadow-slate-300">
            
            <div  className={`rounded-lg  inset-0 absolute w-full h-full ${hover} transition justify-center items-center bg-black/50 text-base font-bold flex-col gap-2 animate-slide-in-bottom backdrop-blur-md animate-duration-300 `}>
                <span className="flex flex-col animate-slide-in-bottom w-1/2 justify-center items-center shadow-lg   bg-white text-black shadow-white/60 p-3 rounded-full">
                <IconShoppingCartPlus size={24}></IconShoppingCartPlus> Añadir Al Carrito
                </span>
                
                </div>
                <img className="p-8 rounded-sm w-96 h-auto" src={img} alt="product image" />
            
            <div className="px-5 pb-5">
                
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">{tittle}</h5>
                
                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <PrinValoration></PrinValoration>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold p-2 w-14 text-center text-black">{price}€</span>
                </div>
            </div>
        </div>
    );
}
