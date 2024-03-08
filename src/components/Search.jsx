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
    const widthDiv = width ? `${width}px` : "0"
    const Icon = ({className})=>{
        if(hidden){
            return <IconSearch className={className} onClick={()=>{setHidden(!hidden)}}/>
        }else{
            return <IconX className={className} onClick={()=>{setHidden(!hidden)}}/>
        }
    }
    return (
        <div className="search">
            <Icon className={'cursor-pointer transition'}></Icon>
            <input type="text" className={`${hiddenClass}`} ref={divRef} placeholder="Iphone, Samsung..." onChange={handleChange} />
            <div className="result" style={{ width: widthDiv }}
            >
                {result.length > 0 &&
                    result.map((phone) => (
                        <Link  to={`/phone/${phone.id}`} onClick={handleClick}  key={phone.id}>
                            <div key={phone.id}>
                                <h3>{phone.name}</h3>
                                <img className="phone-img-search" src={phone.cover} alt={phone.name} />
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
