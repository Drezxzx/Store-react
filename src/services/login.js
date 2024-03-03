export async function login({username, password}) {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data
}