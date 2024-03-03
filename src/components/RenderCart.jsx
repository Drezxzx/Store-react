 import {Link} from 'react-router-dom'
import { useState, useEffect  } from 'react'
import getProducts from '../services/products.js'

 const RenderCart = () => {
    const [products, setProducts] = useState([])
    const [id, setId] = useState()
    const url = location.href
    const urlSplit = url.split('/').includes("cart")
    
    useEffect(() => {
        const username = JSON.parse(localStorage.getItem("user"))
        if (username) {
            getProducts({token : username[0].token}).then((res) => setProducts(res.length))
            console.log(products)
            const user = username[0]
            setId(user.user_id)
        }
    },[])

    if (id && !urlSplit) {
        return <Link to={`/cart`}>Carrito: <span style={{color:"red"}}>{products}</span> productos</Link>
    } else {
        return false
    }

}

export default RenderCart;