import React,{useEffect} from "react";
import cssNav from '../Navbar/Navbar.module.css'
import {useDispatch, useSelector } from 'react-redux'
import { getgenres, ordervideogames, filtergames, resetpagina } from "../../Redux/Actions";
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
        <nav className={cssNav.navcontainer}>
          <h2 className={cssNav.titulo} onClick={onclick} >Videogames App</h2>

            <div>
                <select name="genre" id="genre" onChange={onchangeGenre} className={cssNav.filtergenre}>
                <option key='firstoptiongenre' value="genres" defaultValue >Genre : </option>
                 {
                      genres?.map(genre => {
                      return <option value={genre.name} key={genre.idapi}>{genre.name}</option>
                      })
                 }
                </select>
            </div>

            <div>
                 <select name="ordername" id="ordername" className={cssNav.orderbyname} onChange={onchange}>
                    <option value="orderbyname" defaultValue >Order by name : </option>
                    <option value="A-Z">A-Z</option>  
                    <option value="Z-A">Z-A</option>
                 </select>
            </div>

            <div>
                <select name="orderrating" id="orderrating" className={cssNav.orderbyrating} onChange={onchange}>
                    <option value="orderbyrating" defaultValue>Order by rating : </option>
                    <option value="Best">Best</option>
                    <option value="Worst">Worst</option>
                </select>
            </div> 

            <div>
              <select name="orderbyorigin" id="orderbyorigin" onChange={onchange} className={cssNav.orderbyorigin}>
              <option value="orderbyorigin" defaultValue>Order by origin : </option>
              <option value="Api">Api</option>
                <option value="Created">Created</option>
              </select>
            </div>   
            <Searchbar/>
       </nav>
    )
}
