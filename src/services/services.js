
export default class Services {
    static async buy({token, idProduc}){
        const response = await fetch(`http://localhost:3000/buy/`, {
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
        const response = await fetch(`http://localhost:3000/addtocart`, {
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
        const data = await fetch(`http://localhost:3000/create`, {
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
        const data = await fetch(`http://localhost:3000/profile`, {
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
}
