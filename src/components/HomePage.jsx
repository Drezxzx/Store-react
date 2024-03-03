import { usePhone } from '../hooks/usePhone.jsx'
import ButtonPage from '../components/ButtonsPage.jsx'
import {Link } from 'react-router-dom'
export default function Main() {
    const { movile, pages, setPages, totalPages } = usePhone()

    return (
        <main>
            {totalPages && <ButtonPage pages={pages} setPages={setPages} elementPerpage={totalPages}></ButtonPage>}


            {
                movile?.map(phone => {
                    return (
                        <div className='phone-card' key={phone.id}>
                            <Link to={`/phone/${phone.id}`}>
                                <h3>{phone.name}</h3>
                                <p>{phone.price}</p>
                                <img className='phone-img' src={phone.cover} alt={phone.name} />
                            </Link>
                        </div>
                    )
                })
            }
        </main>

    )

}

