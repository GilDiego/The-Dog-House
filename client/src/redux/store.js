// Stores app info
import { createStore } from "redux"

const initialState = {
    dogs: [],
    temperaments: []
}

const reducer = (state = initialState, action) => {
    return state
}


export default createStore(reducer)