import React from "react";
import cssVideogame from './Videogame.module.css'


export default function Videogame(props) {
    const stylecontainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '15px',
        width: '18rem',
        height: '400px',
        backgroundImage : 'url(' + props.background_image + ')',
        border : 'solid 1px',
        borderRadius : '20px'
    }
    return (
        <div style={stylecontainer}>
            <div className={cssVideogame.body} >
            <p className={cssVideogame.p1}>{props.name}</p>
            <p className={cssVideogame.p2}>jaja</p>
            </div>
        </div>
    )
}