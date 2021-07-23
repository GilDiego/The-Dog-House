export const GET_DOGS = 'GET_DOGS'
export const SEARCH_DOGS = 'SEARCH_DOGS'



// fetches information to show in home
export function getDogs(){
    return function(dispatch){
        return fetch('http://localhost:3001/dogs')
            .then(data => data.json())
            .then (json => {
                dispatch({ type: "GET_DOGS", payload: json})
            })
    }
}

// export function searchDogs(name){
//     return function(dispatch){
//         return fetch('http://localhost:3001/dogs?name=' + name)
//             .then(data => data.json())
//             .then (json => {
//                 dispatch({ type: "SEARCH_DOGS", payload: json})
//             })
//     }
// }
