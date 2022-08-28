import React,{useEffect} from "react";
import cssNav from '../Navbar/Navbar.module.css'
import {useDispatch, useSelector } from 'react-redux'
import { getgenres, ordervideogames, filtergames, resetfilters, resetpagina } from "../../Redux/Actions";
import Searchbar from "../Searchbar/Searchbar";
import { useNavigate } from 'react-router-dom'

export default function NavBar (){
const navigate = useNavigate();
const dispatch = useDispatch();
const genres = useSelector(state => state.genres);
    useEffect( () => {
         dispatch(getgenres())
    },[])
    const onclick = () => {
        navigate('/')
    }
    const onchange = (e) => {
       dispatch(resetpagina())
       dispatch(ordervideogames(e.target.value))
    }
    const onchangeGenre = (e) => {
        dispatch(resetpagina())
        dispatch(filtergames(e.target.value))
    }
    return (
       <div>
        <div className={cssNav.navcontainer}>
          <h2 className={cssNav.titulo} onClick={onclick} >Videogames App</h2>
            <div>
                <select name="genre" id="genre" onChange={onchangeGenre} className={cssNav.filtergenre}>
                <option key='firstoptiongenre' value="genres" selected disabled hidden >Genre : </option>
                 {
                      genres?.map(genre => {
                      return <option value={genre.name} key={genre.idapi}>{genre.name}</option>
                      })
                 }
                </select>
            </div>
            <div>
                 <select name="ordername" id="ordername" className={cssNav.orderbyname} onChange={onchange}>
                    <option value="orderbyname" selected disabled hidden>Order by name : </option>
                    <option value="A-Z">A-Z</option>  
                    <option value="Z-A">Z-A</option>
                 </select>
            </div>
            <div>
                <select name="orderrating" id="orderrating" className={cssNav.orderbyrating} onChange={onchange}>
                    <option value="orderbyrating" selected disabled hidden>Order by rating : </option>
                    <option value="Best">Best</option>
                    <option value="Worst">Worst</option>
                </select>
            </div>    
       </div>
        <Searchbar/>
        </div>
    )
}
