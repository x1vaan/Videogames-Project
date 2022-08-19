import React from "react";
import cssHome from './Home.module.css'
import { Link } from 'react-router-dom'

export default function Home(){
    return (
        <div>
            <h1 className={cssHome.hometittle}>Videogame App</h1>
            <Link to='/videogames'>
            <button className={cssHome.button}>Start</button>
            </Link>
        </div>
    )
}