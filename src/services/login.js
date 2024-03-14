export async function login({username, password}) {
    const response = await fetch('https://api-store-fl2b.onrender.com/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data
}