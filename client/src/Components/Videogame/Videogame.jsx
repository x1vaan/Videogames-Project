import React from "react";
import cssVideogame from './Videogame.module.css'
import { NavLink } from "react-router-dom";

export default function Videogame(props) {
  const image = {
    backgroundImage : 'url(' + props.background_image + ')',
    height : '265px',
    marginBotton: '15px',
    backgroundSize: '280px 265px',
    opacity: '0.8',
  } 

    return (
        <div className={cssVideogame.stylecontainer}>
            <NavLink to={`/videogame/${props.id}`} className={cssVideogame.navlink}>
             <div className={cssVideogame.body}>
            <div style={image}></div>
            <p className={cssVideogame.p1}>{props.name}</p>
            <p className={cssVideogame.p2}>{props.genres.map(genre => genre.name + ' ')}</p>
             </div>
            </NavLink>
        </div>
    )
}