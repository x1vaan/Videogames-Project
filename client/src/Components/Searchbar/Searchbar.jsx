import React,{ useState } from "react";
import { useDispatch } from 'react-redux';
import { searchgame, resetsearch} from "../../Redux/Actions";
import cssSearch from './Searchbar.module.css'

export default function Searchbar() {
const[game, setGame] = useState('');
const dispatch = useDispatch();
const onchange = (e) => {
  setGame(e.target.value)
}
const enter = (e) => {
 if(e.key === 'Enter') {
    dispatch(searchgame(game))
 }
}
const onclear = () => {
    setGame('');
    dispatch(resetsearch())
}
    return (
        <div className={cssSearch.container}>
            <input 
            type="text" 
            placeholder="Press enter to Search game..." 
            id="text"  
            value={game}
            onChange={onchange}
            onKeyPress={enter}
            className={cssSearch.searchbar}
            />
            <div>
             {
              game.length > 0 && <button onClick={onclear} className={cssSearch.button}>X</button>
             } 
            </div>
        </div>
    )
}