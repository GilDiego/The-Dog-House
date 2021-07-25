import { GET_DOGS, SEARCH_DOGS, SEARCH_ID } from "../actions/actions"


const initialState = {
    dogsLoaded: [],
    dogsSearched: '',
    dogById: {}
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
        case SEARCH_ID:
            return {
                ...state,
                dogById: action.payload
            }
            
        default:
            return state

    }
}

export default dogsReducer