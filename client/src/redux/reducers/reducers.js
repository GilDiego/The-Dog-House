import { GET_DOGS } from "../actions/actions"


const initialState = {
    dogsLoaded: [],
}

function dogsReducer (state = initialState, action) {
    
    if (action.type === GET_DOGS){
        return {
            ...state,
            dogsLoaded: action.payload
        }
    }

    return state
}

export default dogsReducer