import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMEDETAIL = "GET_VIDEOGAMEDETAIL"
export const GET_GENRES = "GET_GENRES"
// export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME"
export const SEARCH_GAME = 'SEARCH_GAME'
export const RESET_SEARCH = "RESET_SEARCH"
export const GAMES_ORDERED = 'GAMES_ORDERED'
export const GAMES_FILTERED = 'GAMES_FILTERED'
export const RESET_FILTERS = 'RESET_FILTERS'
export const SET_PAGE = 'SET_PAGE'
export const RESET_PAGINA = 'RESET_PAGINA'
export const RESET_VIDEOGAMEDETAIL = 'RESET_VIDEOGAMEDETAIL'

export const getvideogames = () => {
    return function(dispatch){
        return axios.get('/videogames')
        .then(videogames =>{
            dispatch({type : GET_VIDEOGAMES , payload : videogames.data})
        })
    }
}

export const getvideogamedetail = (id) =>{
    return function(dispatch){
        return axios.get(`/videogame/${id}`)
        .then(videogamedetail => {
            dispatch({type : GET_VIDEOGAMEDETAIL, payload : videogamedetail.data})
        })
    }
}

export const getgenres = () => {
    return function (dispatch){
        return axios.get('/genres')
        .then(genre =>{
            dispatch({type: GET_GENRES, payload : genre.data})
        })
    }
}

export const searchgame = (name) => {
    return function(dispatch){
        return axios.get(`/videogames?name=${name}`)
        .then(videogames =>{
            dispatch({type : SEARCH_GAME , payload : videogames.data})
        })
    }
}

export const resetsearch = () => {
    return {
        type :  RESET_SEARCH
    }
}

export const ordervideogames = (order) => {
    return function(dispatch){
        return axios.get(`games/${order}`)
        .then(videogamesOrdered => {
            dispatch({type : GAMES_ORDERED, payload: videogamesOrdered.data })
        })
    }
}

export const filtergames = (genero) => {
    return function(dispatch) {
        return axios.get(`/game/${genero}`)
        .then(videogamesfiltered => {
            dispatch({type : GAMES_FILTERED, payload : videogamesfiltered.data })
        })
    }
}

export const resetfilters = () => {
    return {
        type : RESET_FILTERS
    }
}

export const setpage = (pagina) => {
  return {
    type : SET_PAGE,
    payload: pagina
  }
}

export const resetpagina = () => {
    return {
        type : RESET_PAGINA
    }
}

export const resetvideogamedetail = () => {
    return {
        type : RESET_VIDEOGAMEDETAIL
    }
}