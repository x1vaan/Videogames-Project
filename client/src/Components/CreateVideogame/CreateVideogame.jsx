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
        if(!/^.{10,30}$/.test(input.description)) {
            errors.description = 'Min 10 and max 30 characters'
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
     const find = input.genre?.find(ele => ele.name === e.target.value);
     if(find) return alert('Genre already added');
     else if(e.target.value === 'genres') return
    else if(input.genre.length === 6) return alert('Can not add more than 6 genres');
    const selectedIndex = e.target.options.selectedIndex;
    setInput({...input, genre : [...input.genre, { idapi : e.target.options[selectedIndex].getAttribute('key_data'), name : e.target.value} ]})
    // console.log(e.target.options[selectedIndex].getAttribute('key_data'))
    return
 }
 if(e.target.name === 'platforms'){
    const find = input.platforms?.find(ele => ele === e.target.value)
    if(find) return alert('Platform already added')
    if(input.platforms.length === 3) return alert('Can not add more platforms')
    if(e.target.value === 'platform') return
    setInput({...input, platforms : [...input.platforms, e.target.value]})
    return
 }
  setInput({...input, [e.target.name] : e.target.value});
}

const handleOnclickback = () => {
   navigate('/videogames')
}

const onclickDeletegenre= (e) => {
    setInput({
        ...input,
        genre : input.genre?.filter(ele => ele.name !== e.target.value)
    })
}

const onclickdeleteplaftorm = (e) => {
  setInput({
    ...input,
    platforms : input.platforms?.filter(ele => ele !== e.target.value)
  })
}

const isEmpty = (obj) =>{
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
const onsubmit = (e) => {
   if(isEmpty(error) && input.genre.length !== 0 && input.platforms.length !== 0){
       axios.post('/videogames/create', {
           name: input.name,
           description : input.description,
           release_date : input.releasedate,
           rating: input.rating,
           genres: input.genre,
           platforms : input.platforms
       })
       alert('Game created!')
   } else {
     e.preventDefault()
     return alert('Missing inputs')
   }
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
                <option value="genres" defaultValue key='firstoption'>Genres : </option>
                 {
                      generos?.map(genre => {
                      return <option value={genre.name} key_data={genre.idapi} key={genre.idapi}>{genre.name}</option>
                      })
                 }
                </select>
                    </label>
                    <label>
                        <select name="platforms" id="platforms" onChange={handleOnchange} className={cssform.selectplatform}>
                        <option value="platform" defaultValue key='firstoptionplatform'>Platforms : </option>
                        <option value="PC">PC</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Playstation">Playstation</option>
                        <option value="Nintendo">Nintendo</option>
                        <option value="Android">Android</option>
                        </select>
                       {
                         input.platforms.length === 3 ? <p className={cssform.platform}>Can not add more than 3 platforms</p> : ''
                       }
                       
                    </label>
                </form>
                <div className={cssform.generos}>
                {
                 input.genre?.map(genero => {
                    return <button key={genero.idapi} value={genero.name} className={cssform.buttongenre} onClick={onclickDeletegenre}>{genero.name}</button>
                 })
                }
                </div>
                <div className={cssform.plataformas}>
                 {
                   input.platforms?.map(plataforma => {
                    return <button key={plataforma} value={plataforma} onClick={onclickdeleteplaftorm} className={cssform.buttonplatform}>{plataforma}</button>
                    })
                 }
                </div>
            </div>
        </div>
    )
}