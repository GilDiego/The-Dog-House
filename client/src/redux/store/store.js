import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import dogsReducer from '../reducers/reducers.js'
import buttonsReducer from "../reducers/buttonsReducer.js";
import thunk from "redux-thunk";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(combineReducers({ buttonsReducer, dogsReducer}),    
    composeEnhancer(applyMiddleware(thunk)))

export default store