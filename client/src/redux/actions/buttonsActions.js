export const FETCH_DB = 'FETCH_DB'
export const SET_OPTIONS = 'SET_OPTIONS'
export const SET_SOURCES = 'SET_SOURCES'

export function fetchDB(){
    return function(dispatch){
        return fetch('http://localhost:3001/dogsDB')
            .then(data => data.json())
            .then (json => {
                dispatch({ type: "FETCH_DB", payload: json})
            })
    }
}

export function setSources(API, DB){
    return function(dispatch){
        let obj = {}
        return ( 
                obj = {API, DB},
                dispatch({ type: "SET_SOURCES", payload: obj}))
            
    }
}
export function setOptionsSelected(temperament, order, weight){
    return function(dispatch){
        let obj = {}
        return ( 
                obj = {temperament, order, weight},
                dispatch({ type: "SET_OPTIONS", payload: obj}))
            
    }
}