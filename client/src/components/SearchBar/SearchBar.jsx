import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { searchDogs } from '../../redux/actions/actions';


export default function Searchbar() {
    const [results, getResults] = useState('')

    const dispatch = useDispatch()
    const resultsRedux = useSelector(state => state.dogsReducer.dogsSearched)

    useEffect(() =>{
            dispatch(searchDogs(results))
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[results])
    
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
            </form>
        </div>
    )
}
