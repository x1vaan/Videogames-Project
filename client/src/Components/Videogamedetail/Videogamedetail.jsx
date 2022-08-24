import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getvideogamedetail } from '../../Redux/Actions.js'
import { useParams } from 'react-router-dom'
import css from './Videogamedetail.module.css'

export default function Videogamedetail () {
   const dispatch = useDispatch();
   const videogamedetail = useSelector(state => state.videogamedetail);
   const id = useParams().id
useEffect(() => {
    dispatch(getvideogamedetail(id))
},[])
    return (
        <div>
         <div>
            <img 
            src={videogamedetail.videogame?.background_image} 
            alt="Image not found" 
            className={css.background_image}
             />
         </div>
         <div className={css.details}>
          <p>{videogamedetail?.videogame?.name}</p>
          <p>{videogamedetail.description}</p>
          <p>{videogamedetail.videogame?.release_date}</p>
          <p>{videogamedetail.videogame?.rating}</p>
          <p>{videogamedetail.videogame?.platforms}</p>
          <p>{videogamedetail.videogame?.Genres.map(genre => genre.name + ' ')}</p>
         </div>
        </div>
    )
}