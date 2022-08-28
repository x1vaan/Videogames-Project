import React,{ useState } from "react";
import axios from 'axios'
import cssform from './CreateVideogame.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { getgenres } from "../../Redux/Actions";

export default function CreateVideogame () {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const generos = useSelector(state => state.genres)

 useEffect(()=>{
   dispatch(getgenres())
 },[])

const [input, setInput] = useState({
    name : '',
    description : '',
    releasedate : '',
    rating : '',
    genre : [],
    platforms: []
});
const[error,setError] = useState({});

const validate = (input) => {
    const errors = {}
    if(!input.name) {
        errors.name = 'Name is required'
    }
    else if(!/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(input.name)) {
      errors.name = 'Name is invalid'
    }
    if(!input.rating){
        errors.rating = 'Rating is required'
    }
    else if(!/[1-5]/.test(input.rating)) {
        errors.rating = 'Rating has to be between 1 to 5'
    }
    if(input.description){
        if(!/^.{1,30}$/.test(input.description)) {
            errors.description = 'Maximum of 30 characters'
        }
    }
    if(!input.releasedate) {
        errors.releasedate = 'Date is required'
    }
    else if (/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(input.releasedate)){
        errors.releasedate = ''
    }
    return errors
}
const handleOnchange = (e) => {
    setError(validate({ ...input,[e.target.name] : e.target.value}));
 if(e.target.name === 'genre') {
     const find = input.genre.find(ele => ele === e.target.value);
     if(find)return
    setInput({...input, genre : [...input.genre, e.target.value ]})
    return
 }
 if(e.target.name === 'platforms'){
    const find = input.platforms.find(ele => ele === e.target.value)
    if(find) return
    if(input.platforms.length === 3) return
    setInput({...input, platforms : [...input.platforms, e.target.value]})
    return
 }
  setInput({...input, [e.target.name] : e.target.value});
}

const handleOnclickback = () => {
   navigate('/videogames')
}
const onsubmit = (e) => {
    if(error) {
        e.preventDefault()
        return alert('Missing inputs')
    }
    axios.post('http://localhost:3001/videogames/create', {
        name: input.name,
        description : input.description,
        release_date : input.releasedate,
        rating: input.rating,
        genres: input.genre,
        platforms : input.platforms
    })
    alert('Game created!')
}
    return (
        <div>
            <button className={cssform.button} onClick={handleOnclickback}>Back</button>
            <div className={cssform.containerform}>
                <form className={cssform.form} onSubmit={onsubmit}>
                    <div className={cssform.containertop}>
                    <h2 className={cssform.titulo}>Create a Videogame</h2>  
                    <input type="submit" name="send" id="submit" value="Create" className={cssform.submitbotton}/>
                    </div>

                   <label>
                   <p className={cssform.name}>Name:</p>
                    <input type="text" value={input.name}  name='name' onChange={handleOnchange} className={cssform.inputname} placeholder='Name...'/>
                    {error.name ? <span className={cssform.spanname}>{error.name}</span> : ''}
                   </label>

                   <label>
                   <p className={cssform.description}>Description : </p> 
                    <input type="text" name="description" onChange={handleOnchange} value={input.description} className={cssform.inputdescription} placeholder='Description...'/>
                    {error.description ? <span className={cssform.spandescription}>{error.description}</span> : ''}
                   </label>

                   <label>
                    <p className={cssform.releasedate}>Release Date : </p>
                    <input type="date" name='releasedate' value={input.releasedate} onChange={handleOnchange} className={cssform.inputrelease} />
                    {error.releasedate ? <span className={cssform.spanrelease}>{error.releasedate}</span>: ''}
                   </label>

                   <label>
                   <p className={cssform.rating}> Rating : </p>
                    <input type="text" name="rating" value={input.rating} onChange={handleOnchange} className={cssform.inputrating} placeholder='Rating...'/>
                    {error.rating ? <span className={cssform.spanrating}>{error.rating}</span> : ''}
                   </label>
                    
                    <label>
                    <select name="genre" id="genre" onChange={handleOnchange} className={cssform.selectgenre}>
                <option value="genres" selected disabled hidden key='firstoption'>Genres : </option>
                 {
                      generos?.map(genre => {
                      return <option value={genre.name} key={genre.idapi}>{genre.name}</option>
                      })
                 }
                </select>
                <div className={cssform.generos}>
                {
                 input.genre?.map(genero => {
                        return <button key={genero} className={cssform.buttongenre}>{genero}</button>
                 })
                }
                </div>
                    </label>
                    <label>
                        <select name="platforms" id="platforms" onChange={handleOnchange} className={cssform.selectplatform}>
                        <option value="platform" selected disabled hidden key='firstoptionplatform'>Platforms : </option>
                        <option value="PC">PC</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Playstation">Playstation</option>
                        <option value="Nintendo">Nintendo</option>
                        <option value="Android">Android</option>
                        </select>
                       {
                         input.platforms.length === 3 ? <p className={cssform.platform}>Max 3 platforms</p> : ''
                       }
                    </label>
                </form>
            </div>
        </div>
    )
}