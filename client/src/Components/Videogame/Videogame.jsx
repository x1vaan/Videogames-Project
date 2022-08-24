import React from "react";
import cssVideogame from './Videogame.module.css'
import { NavLink } from "react-router-dom";

export default function Videogame(props) {
    const stylecontainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '75px',
        marginLeft: '20px',
        width: '350px',
        height: '440px',
        backgroundImage : 'url(' + props.background_image + ')',
        backgroundSize : '350px 440px',
        border : 'solid 1px',
        borderRadius : '20px',
    }
    return (
        <div style={stylecontainer}>
            <NavLink to={`/videogame/${props.id}`}>
            <div className={cssVideogame.body}>
            <p className={cssVideogame.p1}>{props.name}</p>
            <p className={cssVideogame.p2}>{props.genres.map(genre => genre.name + ' ')}</p>
            </div>
            </NavLink>
        </div>
    )
}