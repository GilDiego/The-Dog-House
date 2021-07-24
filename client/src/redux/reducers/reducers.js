import { GET_DOGS, SEARCH_DOGS } from "../actions/actions"


const initialState = {
    dogsLoaded: [],
    dogsSearched: '',
}

function dogsReducer (state = initialState, action) {
    
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogsLoaded: action.payload
            }
        case SEARCH_DOGS:
            return {
                ...state,
                dogsSearched: action.payload
            }
            
        default:
            return state

    }
}

export default dogsReducer