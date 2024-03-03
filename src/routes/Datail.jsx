import {useEffect, useState} from 'react'
import {Header} from '../components/Header.jsx'
import {useParams} from 'react-router-dom'
import Services from '../services/services.js'


export default function DeatialPage() {
    const {id} = useParams();
    const [quantity, setQuantity] = useState(0)
    const [phone, setPhone] = useState([]);
    const [message, setMessage] = useState(false)
    const [token, setToken] = useState()

    const handleClick = async() =>{
        const response = await Services.addToCart({token, idProduc : id, quantity})
        console.log(response)
        if (response) {
            setMessage(true)
            setQuantity(0)
        }

        setTimeout(() => {
            setMessage(false)
        }, 2000);
    }

    useEffect(() => {

        const fetchData = async () => {
            const [user] = JSON.parse(localStorage.getItem("user"));
            setToken(user.token);
            const response = await fetch(`http://localhost:3000/phones/${id}`);
            const data = await response.json();
            console.log(data);
            setPhone(data);
        };
        fetchData();
    }, [id]);

   

    return (
        <div>
            <Header message={message}></Header>
            {phone.length > 0 && phone.map(individualPhone => (
                <div key={individualPhone.id}>
                    <h1>{individualPhone.name}</h1>
                    <img src={individualPhone.cover} style={{width : "100px"}} alt={individualPhone.name} />
                    <p>{individualPhone.price}</p>
                    <p>{individualPhone.description}</p>
                    <input type="number" value={quantity} min={0} onChange={(e) => setQuantity(e.target.value)} placeholder="quantity" id="quantity" name="quantity" />
                    <button onClick={handleClick}>Add to car</button>
                </div>
            ))}
        </div>
    );
}
