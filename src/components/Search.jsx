import { useEffect, useRef } from "react";
import { useState } from "react";
import {Link} from "react-router-dom"
import {IconSearch, IconX} from '@tabler/icons-react'

export default function Search() {
    const divRef = useRef(null);
    const [width, setwitdh] = useState();
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [hidden, setHidden] = useState(true);

    const handleChange = async (e) => {
        setSearch(e.target.value);
    };
    const handleClick = () => {
        divRef.current.value = "";
        setResult([]);
    }
    useEffect(() => {
        if (divRef.current) {
            const { width } = divRef.current.getBoundingClientRect();
            setwitdh(width)
            console.log(width);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (search !== "") {
                const response = await fetch(`http://localhost:3000/search/${search}`);
                const data = await response.json();
                setResult(data);
            } else {
                setResult([]);
            }
        };
        fetchData();

        return () => {};
    }, [search]);
   
    const hiddenClass = hidden ? "hidden" : "";
    const Icon = ({className})=>{
        if(hidden){
            return <IconSearch className={className} onClick={()=>{setHidden(!hidden)}}/>
        }else{
            return <IconX className={className} onClick={()=>{setHidden(!hidden)}}/>
        }
    }
    const App = ()=>{
        if (search.length > 0 && result.length > 0 ) {
           return(
                result.map((phone) => (
                    <Link  to={`/phone/${phone.id}`} onClick={handleClick}  key={phone.id}>
                        <div key={phone.id} onClick={()=>{setHidden(!hidden)}} className=" hover:bg-white/90 transition animate-fade-in animate-duration-250  shadow-black w-full hover:shadow-md rounded p-2 gap-1 flex flex-row">
                            <img className="size-16" src={phone.cover} alt={phone.name} />
                            <h3 className="flex flex-col-reverse "><h3 className="font-semibold">{phone.price}€</h3><span className="text-black/90 text-2xl font-semibold">{phone.name}</span></h3>
                            
                        </div>
                    </Link>
                ))
           )
        }else if (search.length === 0 && result.length ===0){
            return
        }else{
            return <div className="text-black/90 text-2xl font-semibold">No resultados</div>
        }
        
    }
    return (
        <div className="">
            <Icon className={'cursor-pointer transition'}></Icon>
            <div className={`bg-slate-500/20 backdrop-blur-lg ${hiddenClass} w-screen h-screen absolute left-0 top-0 z-50 flex items-center flex-col `}>
            <div className=" bg-slate-100 rounded animate-fade-in animate-duration-300 p-3 md:w-1/2 mt-20 text-black"
            >
                <div className="w-full flex  items-center justify-between p-1">
                <IconSearch></IconSearch>
                <input type="text" className={`${hiddenClass} focus:outline-none text-black shadow rounded w-[90%] p-3 max-h-9`} ref={divRef} placeholder="Iphone, Samsung..." onChange={handleChange} />
                <IconX className="cursor-pointer hover:scale-110" onClick={()=>{setHidden(!hidden)}}></IconX>
                </div>
                <App></App>
           
               
            </div>
            </div>
           
        </div>
    );
}
