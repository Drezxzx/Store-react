
import masterCard  from '../public/masterCard.svg'
import React from 'react';

export default function CheckOut({products, total, totalNeto, buyAll} : 
    {products : number, total : number, totalNeto : number, buyAll : Function}) {


    return (
        <section className="flex justify-center items-center lg:top-40 h-[70%] md:w-full lg:w-[40rem] w-[20rem] bg-white shadow-md shadow-black/80  flex-col gap-3 p-3  ">
            <div className="w-full flex justify-center flex-col items-center gap-2">
            <h1 className="lg:text-2xl font-bold text-start w-full ml-14"> Seleccionar metodo de  pago</h1>
            <div className="flex flex-col items-center justify-center w-56 md:w-[90%] gap-5   " >
                <div className="md:w-full md:h-fit flex w-full md:justify-around md:gap-80  shadow border-2 border-slate-400/70 shadow-slate-600 p-3 gap-3  md:p-2 rounded  items-center">
                <h1 className="text-md text-bold  md:justify-center flex md:gap-4 gap-1 ">
                   <img src={masterCard} className="size-16 border shadow-sm shadow-slate-600" alt="" />
                    <h3 className="flex flex-col text-base font-bold justify-center">Master Card<span className="text-sm text-slate-700/80 font-semibold">****** ******6676</span></h3>
                </h1>
                    <input className="size-5 focus:outline-none" type="checkbox" />
                </div>
                <div className="w-full h-fit flex  md:justify-around md:gap-80  shadow border-2 border-slate-400/70 shadow-slate-600  p-2 rounded  items-center">
                <h1 className="text-base text-bold flex gap-4 ">
                   <img src={masterCard} className="size-16 border shadow-sm shadow-slate-600" alt="" />
                    <h3 className="flex flex-col text-base font-bold justify-center">Master Card<span className="text-sm text-slate-700/80 font-semibold">****** ******8076</span></h3>
                </h1>
                    <input className="size-5 focus:outline-none " type="checkbox" />
                </div>
            </div>
            <div className=" w-[90%]">
                <h1 className="lg:text-2xl font-bold mt-2 ">Detalles</h1>
                <span className="flex justify-between text-base text-slate-600/80 font-semibold">
                    <h3>
                        {products} Productos 
                    </h3>
                    <span>
                        {total}
                    </span>
                </span>
                <span className="flex justify-between text-base  text-slate-600/80 font-semibold">
                    <h3>
                        Envio
                    </h3>
                    <span>
                        10€
                    </span>
                </span>
                <span className="flex justify-between text-base  text-slate-600/80 font-semibold">
                    <h3>
                        Total con envio 
                    </h3>
                    <span>
                        {totalNeto}
                    </span>
                </span>
            </div>
            </div>
            
            <button onClick={buyAll} className="bg-black text-xl w-[80%] p-3 shadow-md shadow-black/80 hover:scale-100 hover:bg-black/60 text-white rounded">Comprar todo</button>
            
        </section>
    );
}
