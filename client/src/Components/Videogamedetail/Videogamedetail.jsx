import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getvideogamedetail } from '../../Redux/Actions.js'
import { useParams, useNavigate } from 'react-router-dom'
import css from './Videogamedetail.module.css'

export default function Videogamedetail () {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const videogamedetail = useSelector(state => state.videogamedetail);
   const id = useParams().id
useEffect(() => {
    dispatch(getvideogamedetail(id))
},[])
const handleOnclickback = () => {
    navigate('/videogames')
 }
    return (
        <div>
        <button className={css.buttonback} onClick={handleOnclickback}>Back</button>
         <div className={css.container}>
            <div>
             <img 
             src={videogamedetail.videogame?.background_image} 
             alt="Image not found" 
             className={css.background_image}
                />
            </div>
             <p className={css.p}>Name: <span>{videogamedetail?.videogame?.name}</span> </p> 
             <p className={css.prelease}>Release Date: <span>{videogamedetail.videogame?.release_date}</span></p> 
             <p className={css.prating}>Rating: <span>{videogamedetail.videogame?.rating}</span></p>
             <p className={css.platforms}>Platforms: <span>{videogamedetail.videogame?.platforms}</span></p>
             <p className={css.genres}>Genres: <span>{videogamedetail.videogame?.Genres.map(genre => genre.name + ' ')}</span></p>
             <p className={css.description}>DESCRIPTION: <span>{videogamedetail.description}</span></p>
         </div>
        </div>
    )
}