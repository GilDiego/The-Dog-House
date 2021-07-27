import { FETCH_DB, FETCH_TEMPERAMENTS, SET_OPTIONS, SET_SOURCES } from "../actions/buttonsActions.js"

const initialState = {
    dogsFromDB: {},
    sources: {},
    optionsSelected: {},
    temperamentsFromDB: []
}

function buttonsReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_DB:
            return {
                ...state,
                dogsFromDB: action.payload
            }
        case SET_SOURCES:
            return {
                ...state,
                sources: action.payload
            }
        case SET_OPTIONS:
            return {
                ...state,
                optionsSelected: action.payload
            } 
        case FETCH_TEMPERAMENTS:
            return {
                ...state,
                temperamentsFromDB: action.payload
            }
        default:
            return state
    }
}

export default buttonsReducer