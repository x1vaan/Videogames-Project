import React, { useEffect, useState }from "react";
import { useDispatch, useSelector } from 'react-redux'
import Videogame from '../Videogame/Videogame.jsx'
import videogamescss from './Videogames.module.css'
import { getvideogames, resetfilters, resetpagina, resetvideogamedetail } from "../../Redux/Actions.js";
import Pagination from '../Pagination/Pagination'
import { useNavigate } from "react-router-dom";
import Loading from '../Loading/Loading.jsx'

export default function Videogames() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
     
    const videogames = useSelector(state => state.videogames)
    const searchjuego = useSelector(state => state.searchjuego)
    const currentpage = useSelector(state => state.pagina)
    const filterstate = useSelector(state => state.filterstate)
    const orderstate = useSelector(state => state.orderstate)

    const [gamesPerPage, setGamesPerPage ] = useState(15);
    useEffect(() => {
      dispatch(resetfilters())
      dispatch(resetpagina())
      dispatch(getvideogames())
      dispatch(resetvideogamedetail())
    },[])

    const ultimoindex = currentpage * gamesPerPage
    const indexinicio = ultimoindex - gamesPerPage
    const games = videogames.slice(indexinicio,ultimoindex)

    const onclick = () =>{
      navigate('/videogames/create')
    }
    const onreset = () => {
      dispatch(resetfilters())
      dispatch(getvideogames())
    }

    const isEmpty = (obj) =>{
      for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false;
      }
      return true;
  }

    return ( 
        <div>
            <div>
                <button onClick={onclick} className={videogamescss.creategame}>Create Videogame</button>
            </div>
            <div>
              {
                filterstate !== 'Not filtered' || orderstate === 'Ordered' ? 
                <button onClick={onreset} className={videogamescss.buttonreset}>Clean filters</button> : ''
              }
            </div>
           <div className={videogamescss.pagination}>
             {
                <Pagination juegos={videogames.length} games_per_page={gamesPerPage} className={videogamescss.pagination}/>
             }
           </div>
          <div className={videogamescss.container}>
           {  
              isEmpty(videogames) ? <Loading/> :
             videogames.length === 0 && filterstate === 'Not found' ? <p className={videogamescss.notfound}>Game not found</p> : 

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
