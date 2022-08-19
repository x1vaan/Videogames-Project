import React, { useEffect, useState } from "react";
import Videogame from '../Videogame/Videogame.jsx'
import axios from 'axios'
import videogamescss from './Videogames.module.css'

export default function Videogames() {
    const[videogames, setVideogames] = useState([]);
    useEffect(()=> {
        async function query() {
            const juegos = await axios.get('http://localhost:3001/videogames')
            setVideogames(juegos.data)
        }
        query();
    },[])
    
    return (
        <div className={videogamescss.container}>
           {
               videogames.map(juego => {
                return <Videogame name={juego.name} genres={juego.genres} background_image={juego.background_image} key={juego.id}/>
               })
           }
        </div>
    )
}