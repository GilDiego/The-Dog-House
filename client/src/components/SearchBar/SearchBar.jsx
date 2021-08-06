import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { searchDogs, saveSearch } from '../../redux/actions/actions';

export default function Searchbar() {
    const [results, setResults] = useState('')

    const dispatch = useDispatch()
    const resultsRedux = useSelector(state => state.dogsReducer.dogsSearched)
    

    function handleChange(e){
        setResults(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        // setResults(document.getElementsByClassName('searchField')[0].value)
        dispatch(searchDogs(results))
        dispatch(saveSearch(results))
    }

    function clearSearch(){
        setResults('')
        dispatch(searchDogs())
    }
    return (
        
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                
                        <input
                            className='searchField'
                            type="text"
                            placeholder="Search for dogs"
                            onChange={e => handleChange(e)}
                            value={results}
                        />
                        <input type="submit" value="Fetch!"/>
                        {
                            (!Array.isArray(resultsRedux)) ? <p>No results.</p> : null
                        }
            </form>
            <button onClick={e => clearSearch()}>Clear</button>
        </div>
    )
}
