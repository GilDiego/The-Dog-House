import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, searchDogs } from '../../redux/actions/actions';
import { fetchDB } from '../../redux/actions/buttonsActions';
import Card from '../Card/Card.jsx'


export default function Cards() {
    
    const [sources, setSources] = useState({})
    const [options, setOptions] = useState({})
    const [display, setDisplay] = useState([])

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
    }, [])

    // concats arrays to display initially
    useEffect(() => {
            if (dogsDB.length && dogsRedux.length) {
                return setDisplay(dogsDB.concat(dogsRedux))
            }
    }, [dogsRedux, dogsDB])

    // listener for sources and options change
    useEffect(() => {
        setSources(srcs)
        setOptions(optionsSelected)
    }, [srcs, optionsSelected])

    // filters display if sources options are changed
    useEffect(() => {
        if (dogsDB.length && dogsRedux.length){
            if (sources.API && sources.DB) return setDisplay(dogsDB.concat(dogsRedux))
            if (sources.API && !sources.DB) return setDisplay(dogsRedux)
            if (!sources.API && sources.DB) return setDisplay(dogsDB)
            if (!sources.API && !sources.DB) return setDisplay([])
        }
        else if (!dogsDB.length && dogsRedux.length){
            if (sources.API && sources.DB) return setDisplay(dogsRedux)
            if (sources.API && !sources.DB) return setDisplay(dogsRedux)
            // next needs to show alert "no dogs in DB"
            if (!sources.API && sources.DB) return setDisplay(dogsRedux)
            if (!sources.API && !sources.DB) return setDisplay([])
        }
    }, [sources])

    // filters display if options are changed
    useEffect(() => {
        // if options.order === 'A-Z'
        console.log('An option has changed')
    }, [options])
    
    // sets ID for API or DB data
    function chooseId(idAPI, idDB){
        if (idDB) return idDB
        else return idAPI
    }
    return (
        (resultsRedux.length < 1) ? (
            (display.length < 1) ? ( <p>Loading gif</p> ) : (
                <>
                        {
                            display.map(dog => <Card 
                                key={chooseId(dog.id, dog.idDB)}
                                id={chooseId(dog.id, dog.idDB)}
                                img={dog.image}
                                name={dog.name}
                                temperaments={dog.temperament}
                            />)
                        }
                    </>
            )
        ) : (
                (resultsRedux === 'No search queries.' ) ? (<p>No matches. Sad doggo</p>) : (
                    
                    <>
                        {
                        resultsRedux.map(dog => <Card 
                            key= {chooseId(dog.id, dog.idDB)}
                            id={chooseId(dog.id, dog.idDB)}
                            img={dog.image}
                            name={dog.name}
                            temperaments={dog.temperament}
                            />)
                        }
                    </>
                )
            )
            //
    )
}
        
        // // on component mount, fetch storage for display value
        // useEffect(() => {
        //     const displayValue = JSON.parse(localStorage.getItem("display") || [])
        //     setDisplay(displayValue)
        //   }, [])
    
        // // each time display changes, saves display in local storage
        // useEffect(() => {
        //     localStorage.setItem("display", JSON.stringify(display))
        // }, [display])
        