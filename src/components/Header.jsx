import Search from "./Search"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RenderCart from "./RenderCart"
import Menu from "./menu"

export function Header({ message }) {
    const [usernameValue, setUsernameValue] = useState("");

    useEffect(() => {
        const username = JSON.parse(localStorage.getItem("user"));
        if (username) {
            const user = username[0];
            setUsernameValue(user.username);
        }
    }, []);

    return (
        <header>
            <Menu />
            <Search />
            <Link to={"/"}>
                <h1>DREPHONE</h1>
            </Link>
            <h2>Username: {usernameValue}</h2>
            <div className={message ? "message" : "not-message"}>
                <RenderCart />
            </div>
        </header>
    );
}
