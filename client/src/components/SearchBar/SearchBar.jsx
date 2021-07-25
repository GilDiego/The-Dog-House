import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { searchDogs } from '../../redux/actions/actions';


export default function Searchbar() {
    // Component state
    const [results, getResults] = useState('')

    // Redux Hooks
    const dispatch = useDispatch()
    const resultsRedux = useSelector(state => state.dogsSearched)

    useEffect(() =>{
            dispatch(searchDogs(results))
    },[results])

    // function handleSubmit(e){
    //     e.preventDefault();
    //     dispatch(searchDogs(results))
    // }

    // Cuando searchbar se active para resolver busqueda desde component load
    
    function handleChange(e){
        getResults(e.target.value)
    }

    return (
        
        <div>
            <form>
                
                        <input
                            type="text"
                            placeholder="Search for dogs"
                            onChange={e => handleChange(e)}
                        />
                        {/* <input type="submit" value="Search" /> */}
            </form>
        </div>
    )
}
