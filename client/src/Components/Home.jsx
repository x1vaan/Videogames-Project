import React from "react";
import cssHome from './Home.module.css'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { resetsearch } from "../Redux/Actions";

export default function Home(){
const navigate = useNavigate();
const dispatch = useDispatch();
const onclick = () => {
  dispatch(resetsearch())
    navigate('/videogames')
}
    return (
        <div>
            <h1 className={cssHome.hometittle}>Videogame App</h1>
            <button className={cssHome.button} onClick={onclick}>Start</button>
            {/* <h1 className={cssHome.developed}>Developed by Ivan Garcia</h1>
            <i className="fa fa-github fa_custom fa-2x"></i> */}
        </div>
    )
}