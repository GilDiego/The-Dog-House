import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import dogsReducer from '../reducers/reducers.js'
import thunk from "redux-thunk";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    dogsReducer,
    composeEnhancer(applyMiddleware(thunk))
    
)

export default store