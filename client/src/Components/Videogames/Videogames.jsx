import React, { useEffect, useState }from "react";
import { useDispatch, useSelector } from 'react-redux'
import Videogame from '../Videogame/Videogame.jsx'
import videogamescss from './Videogames.module.css'
import { getvideogames } from "../../Redux/Actions.js";
import Pagination from '../Pagination/Pagination'
import { useNavigate } from "react-router-dom";

export default function Videogames() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames)
    const searchjuego = useSelector(state => state.searchjuego)
    const currentpage = useSelector(state => state.pagina)
    const [gamesPerPage, setGamesPerPage ] = useState(15);
    useEffect(()=> {
        if(videogames.length === 0) dispatch(getvideogames())
    },[videogames])
    const ultimoindex = currentpage * gamesPerPage
    const indexinicio = ultimoindex - gamesPerPage
    const games = videogames.slice(indexinicio,ultimoindex)

    const onclick = () =>{
      navigate('/videogames/create')
    }
    return ( 
        <div>
            <div>
                <button onClick={onclick}>Create Videogame</button>
            </div>
           <div className={videogamescss.pagination}>
             {
                <Pagination juegos={videogames.length} games_per_page={gamesPerPage}/>
             }
           </div>
          <div className={videogamescss.container}>
           {  
               searchjuego.length === 0 ? games?.map(juego => {
                return <Videogame 
                name={juego.name} 
                genres={juego.Genres} 
                background_image={juego.background_image} 
                key={juego.id}
                id={juego.id}
                />
               })
                : searchjuego.map(juego => {
                return <Videogame 
                name={juego.name} 
                genres={juego.Genres} 
                background_image={juego.background_image} 
                key={juego.id}
                id={juego.id}
                />
               })
           }
          </div>
        </div>
    )
}
