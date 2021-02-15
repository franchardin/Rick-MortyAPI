import axios from 'axios'


// constantes
let initialData = {
    fetching: false,
    array: [],
    current: {}
}

let URL = "https://rickandmortyapi.com/api/character"

let GET_CHARACTERS = "GET_CHARACTERS"
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"

let REMOVE_CHARACTER = "REMOVE_CHARACTER"

// reducer
export default function reducer(state = initialData, action){
    switch(action.type){
        case REMOVE_CHARACTER:
            return { ...state, array: action.payload }

        case GET_CHARACTERS:
            return { ...state, fetching: true}
        case GET_CHARACTERS_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_CHARACTERS_SUCCESS:
//el objeto se popula en caso de pasar por esta parte del switch con el estado inicial y el array con lo que venga en el action.payload
            return { ...state, array: action.payload, fetching: false}
        default:
            return state
    }
}

// actions o thunk (promesa)
export let removeCharacterAction = () => (dispatch, getState) =>{
    // donde estan los personajes? en el state
    let {array} = getState().characters
    // sacamos el personaje en el índice 0 del array
    array.shift()
    // despachamos un array con spread operator (creamos uno nuevo)
    dispatch({
        type: REMOVE_CHARACTER,
        payload: [...array]
    })
}

export let getCharactersAction = () => (dispatch, getState) =>{
    dispatch({
        type: GET_CHARACTERS
    })
    return axios.get(URL)
    // respuesta, si hay resultado devuelve en caso de éxito ese payload
    .then(res => {
        dispatch({
            type: GET_CHARACTERS_SUCCESS,
            payload: res.data.results
        })
    })
    .catch(err=>{
        console.log(err)
        dispatch({
            type: GET_CHARACTERS_ERROR,
            payload: err.response.message
        })
    })
}