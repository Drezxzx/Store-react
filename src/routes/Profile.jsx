import { useEffect, useState } from 'react'
import Services from '../services/services.js'
export default function Profile() {
    const [json] = JSON.parse(localStorage.getItem('user'))
    const { token } = json
    const [profile, setProfile] = useState()

    useEffect(() => {
        const getProfile = async () => {
            const data = await Services.getProfile({ token })
            setProfile(data)
            console.log(data)
        }
        getProfile()
    }, [])

    const RenderProfile = () => {
        return (
            <main className='w-screen h-screen' >
                <h1>{profile.username}</h1>
                <div className='flex w-full h-full ' >
                    {profile.buys.map((buy) => {
                        return (
                            <div className='' key={buy.id}>
                                <strong>{buy.nom_moviles}</strong>
                                <strong>{buy.quantity}</strong>
                                <img className='w-20' src={buy.nom_imagenes} alt="imagen de un movil"/>
                                <h1>{buy.fec_compra}</h1>
                                <strong className='text-green-900'>comprado ✔</strong>
                            </div>
                        )
                    })}
                </div>
            </main>
        )
    }

    return (
        <main className='flex bg-slate-500 w-screen h-screen'>
        {profile ? <RenderProfile /> : <h1>loading</h1>}
        </main>
       
    )
}