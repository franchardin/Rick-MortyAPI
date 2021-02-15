import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './userDuck'
import charsReducer, {getCharactersAction} from './charsDuck'

// unimos todos los reducers en uno solo
let rootReducer = combineReducers({
    user: userReducer,
    characters: charsReducer
})

// llamamos a las herramientas de desarrollador
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creamos un store con herramientas de desarrollador. Podemos hacer otra función sin las mismas para producción.
export default function generateStore(){
//  let store = createStore(reducer, initialdata, middlewares)
    let store = createStore(
        rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
    )
    // Traemos a los personajes por primera vez
    getCharactersAction()(store.dispatch, store.getState)
    return store
}