import React,{ useState } from "react";
import { useDispatch } from 'react-redux';
import { searchgame, resetsearch} from "../../Redux/Actions";
import cssSearch from './Searchbar.module.css'

export default function Searchbar() {
const[game, setGame] = useState('');
const dispatch = useDispatch();
const onchange = (e) => {
  setGame(e.target.value)
  dispatch(searchgame(game))
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
        <div>
            <input 
            type="text" 
            placeholder="  Search game..." 
            id="text"  
            value={game}
            onChange={onchange}
            onKeyPress={enter}
            className={cssSearch.searchbar}
            />
            <div>
             {
              game.length > 0 && <button onClick={onclear} className={cssSearch.button}>Clear</button>
             } 
            </div>
        </div>
    )
}