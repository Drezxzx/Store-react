export default async function getProducts({token}){
    const response = await fetch(`http://localhost:3000/products/`, {
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    })
    try {
        const data = await response.json()
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
    }

} 