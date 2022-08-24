import React,{ useState } from "react";
import axios from 'axios'
import cssform from './CreateVideogame.module.css'

export default function CreateVideogame () {
const[name, setName] = useState('');

const handleOnchange = (e) =>{
  setName(e.target.value)
}
    return (
        <div>
            <div className={cssform.containerform}>
                <form className={cssform.form}>
                    <h2>Create a Videogame</h2>
                   <input type="submit" name="Send" id="submit"value="Send"/>
                   <label>Name : </label>
                   <input type="text" value={name}/>
                </form>
            </div>
        </div>
    )
}