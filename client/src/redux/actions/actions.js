export const GET_DOGS = 'GET_DOGS'
export const SEARCH_DOGS = 'SEARCH_DOGS'
export const SEARCH_ID = 'SEARCH_ID'
export const POST_DOG = 'POST_DOG'
export const SAVE_SEARCH = 'SAVE_SEARCH'



export function getDogs(){
    return function(dispatch){
        return fetch('http://localhost:3001/dogs')
            .then(data => data.json())
            .then (json => {
                dispatch({ type: "GET_DOGS", payload: json})
            })
    }
}


export function searchDogs(name){
    return function(dispatch){
        if (!name) {
            return dispatch({ type: "SEARCH_DOGS", payload: []})
        }
        else return fetch('http://localhost:3001/dogs?name=' + name)
            .then(data => data.json())
            .then (json => {
                dispatch({ type: "SEARCH_DOGS", payload: json})
            })
    }
}

export function searchId(id){
    return function(dispatch){
        return fetch('http://localhost:3001/dogs/' + id)
            .then(data => data.json())
            .then (json => {
                dispatch({ type: "SEARCH_ID", payload: json})
            })
    }
    }

export function saveSearch(search){
    return function(dispatch){
        let searchString = ''
        return (
            searchString = search,
            dispatch({ type: "SAVE_SEARCH", payload: searchString})
        )
    }
}