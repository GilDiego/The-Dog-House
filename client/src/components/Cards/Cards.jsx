import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDogs } from '../../redux/actions/actions';
import { fetchDB } from '../../redux/actions/buttonsActions';
import Card from '../Card/Card.jsx'


export default function Cards() {
    
    const [sources, setSources] = useState({})
    const [options, setOptions] = useState({})

    const dispatch = useDispatch()
    const dogsRedux = useSelector(state => state.dogsReducer.dogsLoaded)
    const resultsRedux = useSelector(state => state.dogsReducer.dogsSearched)
    const dogsDB = useSelector(state => state.buttonsReducer.dogsFromDB)

    const srcs = useSelector(state => state.buttonsReducer.sources)
    const optionsSelected = useSelector(state => state.buttonsReducer.optionsSelected)


    useEffect(()=>{
        dispatch(getDogs())
        dispatch(fetchDB())
        setSources(srcs)
        setOptions(optionsSelected)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    
    return (
        (resultsRedux === 'No search queries.') ? (<p>No results. Sad doggo</p>) : (
                (resultsRedux.length > 0) ? (
            <>

                {
                    resultsRedux.map(dog => <Card 
                        key={dog.id}
                        id={dog.id}
                        img={dog.image}
                        name={dog.name}
                        temperaments={dog.temperament}
                    />)
                }
                </>
                ) : (
            <>
                {
                    dogsRedux.map(dog => <Card 
                        key={dog.id}
                        id={dog.id}
                        img={dog.image}
                        name={dog.name}
                        temperaments={dog.temperament}
                    />)
                }
            </>
        ))
    )
}
    // else return <img src="../../media/loading1.gif" alt="Loading" />

