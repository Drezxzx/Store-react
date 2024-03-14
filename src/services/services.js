
export default class Services {
    static async buy({token, idProduc}){
        const response = await fetch(`https://api-store-fl2b.onrender.com/buy/`, {
            method: 'POST',
            body: JSON.stringify({ 
                products : idProduc
              }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response.json()
        
        
    }
    static async addToCart({token, idProduc, quantity}){
        const response = await fetch(`https://api-store-fl2b.onrender.com/addtocart`, {
            method: 'POST',
            body: JSON.stringify({
                "idmovile" : idProduc,
                "quantity" : quantity
              }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response.json()
    }

    static async createUser({email, password, username}){
        console.log({email, password, username});
        const data = await fetch(`https://api-store-fl2b.onrender.com/create`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'},
            body : JSON.stringify({
                email : email,
                password : password,
                username : username
            })
        })
        if(data.status === 200){
            return data.json()
        }
        return new Error(data.status)
    }

    static async getProfile({token}){
        const data = await fetch(`https://api-store-fl2b.onrender.com/profile`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(data.status === 200){
            return data.json()
        }
        return new Error(data.status)
    }  
    static async getTotal({token}){
        const data = await fetch(`https://api-store-fl2b.onrender.com/total`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(data.status === 200){
            const res = await data.json()
            const total = parseInt(res.total)
           return {total , productos:res.productos}
        }
        return new Error(data.status)
    }
    static async deleteFronTheCart({token, idProduc}){
        console.log(idProduc);
        const data = await fetch(`https://api-store-fl2b.onrender.com/delete/${idProduc}`, {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(data.status === 200){
            return await data.json()
            
        }
        return new Error(data.status)
    }
    static async buyAll({token}){
        const data = await fetch(`https://api-store-fl2b.onrender.com/buyAll`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(data.status === 200){
            return await data.json()
        }
        return new Error(data.status)
    }
}
