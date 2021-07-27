import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { searchDogs } from '../../redux/actions/actions';

// resultsredux no se puede actualizar cuando se carga la pagina solo cuando se hace busqueda
export default function Searchbar() {
    const [results, setResults] = useState('')

    const dispatch = useDispatch()
    const resultsRedux = useSelector(state => state.dogsReducer.dogsSearched)
    

    function handleChange(e){
        setResults(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchDogs(results))
    }
    function clearSearch(){
        setResults('')
        dispatch(searchDogs())
    }
    return (
        
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                
                        <input
                            type="text"
                            placeholder="Search for dogs"
                            onChange={e => handleChange(e)}
                            value={results}
                        />
                        <input type="submit" value="Fetch!"/>
            </form>
            <button onClick={e => clearSearch()}>Clear</button>
        </div>
    )
}
