 import {Link} from 'react-router-dom'
import { useState, useEffect  } from 'react'

import getProducts from '../services/products.js'
import {IconGardenCart, IconExclamationMark} from '@tabler/icons-react'

 const RenderCart = () => {
 
    const [products, setProducts] = useState([])
    const [id, setId] = useState()
    const url = location.href
    const urlSplit = url.split('/').includes("cart")
    
    useEffect(() => {
        const username = JSON.parse(localStorage.getItem("user"))
        if (username) {
            getProducts({token : username[0].token}).then((res) => setProducts(res))
            console.log(products);
            const user = username[0]
            setId(user.user_id)
        }
    },[])

    const PrintNotification = ()=>{
        if (products.length > 0){
            return (
                <span className='absolute bg-red-600 p-2 rounded-full left-8 top-0 animate-pulse'></span>
            )

        }
    }
    
    if (id && !urlSplit) {
        return <Link className='flex flex-row' to={`/cart`}>
            <span className='relative'>
                
                {products && <PrintNotification/>}
                <IconGardenCart size={40} ></IconGardenCart>
                </span></Link>
    } else {
        return false
    }

}

export default RenderCart;