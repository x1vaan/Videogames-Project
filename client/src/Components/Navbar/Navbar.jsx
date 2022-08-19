import React from "react";
import cssNav from '../Navbar/Navbar.module.css'
import axios from 'axios'
import { useState, useEffect } from "react";

export default function NavBar (){
    const[genres, setGenres] = useState([]);
    useEffect( () => {
        async function query () {
            const generos = await axios.get('http://localhost:3001/genres');
            setGenres(generos.data.creados)
        } 
        query()
    },[])
    return (
       <div>
        <div className={cssNav.navcontainer}>
          <h2 className={cssNav.titulo}>Videogames App</h2>
            <form action="filtergenre" className={cssNav.filtergenre}>
                <select name="genre" id="genre">
                <option value="genres" selected disabled hidden>Genre: </option>
                 {
                      genres.map(genre => {
                      return <option value={genre.name} key={genre.id}>{genre.name}</option>
                      })
                 }
                </select>
            </form>
            <form action="orderbyname" className={cssNav.orderbyname}>
                 <select name="ordername" id="ordername">
                    <option value="orderbyname" selected disabled hidden>Order by name: </option>
                    <option value="A-Z">A-Z</option>  
                    <option value="Z-A">Z-A</option>
                 </select>
            </form>
            <form action="orderbyrating" className={cssNav.orderbyrating}>
                <select name="orderrating" id="orderrating">
                    <option value="orderbyrating" selected disabled hidden>Order by rating: </option>
                    <option value="bestrated">Best</option>
                    <option value="worstrated">Worst</option>
                </select>
            </form>
       </div>
            <input type="search" placeholder="    Search game..." id="search" className={cssNav.searchbar}/>
        </div>
    )
}
