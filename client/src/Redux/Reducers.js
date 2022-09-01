import {GET_VIDEOGAMES, GET_VIDEOGAMEDETAIL, GET_GENRES, SEARCH_GAME, RESET_SEARCH, GAMES_ORDERED, SET_PAGE, GAMES_FILTERED, RESET_FILTERS, RESET_PAGINA, RESET_VIDEOGAMEDETAIL} from './Actions'

const initialState = {
  videogames: [],
  videogamedetail : {},
  searchjuego : [],
  genres: [],
  pagina : 1,
  filterstate : 'Not filtered',
  orderstate : 'Not ordered'
}

export default function Reducer (state = initialState,action) {
  switch(action.type){
   case GET_VIDEOGAMES: 
   return {
    ...state,
     videogames : action.payload
   }
   case GET_VIDEOGAMEDETAIL:
    return {
        ...state,
        videogamedetail : action.payload
    }
    case GET_GENRES:
      return {
        ...state,
        genres : action.payload
      }
     case SEARCH_GAME:
      return {
        ...state,
       searchjuego: action.payload
      }
      case RESET_SEARCH: 
      return {
        ...state,
        searchjuego : []
      }
      case RESET_FILTERS:
        return {
          ...state, orderstate: 'Not ordered', filterstate: 'Not filtered'
        }
      case GAMES_ORDERED:
        return {
          ...state,
          videogames : action.payload, orderstate : 'Ordered'
        }
        case GAMES_FILTERED :
          if(action.payload.length === 0) {
            return {
              ...state, filterstate : 'Not found', videogames : []
            }
          }
          return {
            ...state,
            videogames : action.payload, filterstate : 'Found'
          }
        case SET_PAGE:
          return {
            ...state,
            pagina : action.payload
          }
          case RESET_PAGINA:
            return {
              ...state, pagina : 1
            }
            case RESET_VIDEOGAMEDETAIL:{
              return {
                ...state, videogamedetail : {}
              }
            }
    default :
    return state
  }
};