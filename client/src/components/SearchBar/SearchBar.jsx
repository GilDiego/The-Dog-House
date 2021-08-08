import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { searchDogs, saveSearch } from '../../redux/actions/actions';
import './SearchBar.css'

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
        
        <div className="search-box" type="submit">
            <form onSubmit={e => handleSubmit(e)} >
                
                        <input
                            className="search-field"
                            type="text"
                            placeholder="Search for dogs..."
                            onChange={e => handleChange(e)}
                            value={results}
                        />
                        <input className="search-button" type="submit" value={false}/>
                        {
                            (!Array.isArray(resultsRedux)) ? <p className='search-error'>No results.</p> : null
                        }
            <button className="clear-button" onClick={e => clearSearch()}>ₓ</button>
            </form>
        </div>
    )
}
