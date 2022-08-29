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
            <div className={css.name}>
            <p>Name : </p>
            <p className={css.pname}>{videogamedetail?.videogame?.name}</p>
            </div>
        <div className={css.releasedate}>
            <p>Release Date : </p>
        <p className={css.p}>{videogamedetail.videogame?.release_date}</p>
        </div>
          <div className={css.rating}>
            <p>Rating : </p>
          <p className={css.p}>{videogamedetail.videogame?.rating}</p>
          </div>
         <div className={css.platforms}>
            <p>Platforms: </p>
         <p className={css.p}>{videogamedetail.videogame?.platforms}</p>
         </div>
         <div className={css.genres}>
            <p>Genres: </p>
         <p className={css.p}>{videogamedetail.videogame?.Genres.map(genre => genre.name + ' ')}</p>
         </div>
         <div className={css.description}>
                <p>Description: </p>
            <p className={css.p}>{videogamedetail.description}</p>
            </div>
         </div>
        </div>
    )
}