import './Cards.css';
import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDogs } from '../../redux/actions/actions';
import { fetchDB } from '../../redux/actions/buttonsActions';
import Pagination from '../Pagination/Pagination.jsx';
import Card from '../Card/Card.jsx'
import loadingGif from '../../media/loading1.gif'

export default function Cards() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [display, setDisplay] = useState([])
    const [finalDisplay, setFinalDisplay] = useState([])
    const [page, setPage] = useState(1)
    const [postsPerPage] = useState(8)

    const dispatch = useDispatch()
    const dogsRedux = useSelector(state => state.dogsReducer.dogsLoaded)
    const resultsRedux = useSelector(state => state.dogsReducer.dogsSearched)
    const dogsDB = useSelector(state => state.buttonsReducer.dogsFromDB)
    const searchString = useSelector(state => state.dogsReducer.search)
    const srcs = useSelector(state => state.buttonsReducer.sources)
    const options = useSelector(state => state.buttonsReducer.optionsSelected)

    // When component loads, stores data from Redux
    useEffect(() => {
        if (!dogsRedux.length) dispatch(getDogs())
        if (!dogsDB.length) dispatch(fetchDB())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // When data from redux is stored, concats data if there are multiple sources
    useEffect(() => {
        if (dogsRedux.length && dogsDB.length) setData(dogsDB.concat(dogsRedux))
        else if (dogsRedux.length && !dogsDB.length) setData(dogsRedux)
    },[dogsRedux, dogsDB])
    
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////// Sources and Filter functions ////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    function filterAPI(array){
        if (srcs.API === false){
            return array.filter(dog => !dogsRedux.includes(dog))
        }
        else return array
    }
    function filertAPISearch(array){
        if (srcs.API === false){
            return array.filter(dog => dogsDB.includes(dog))
        }
        else return array
    }
    function filterDB(array){
        if (srcs.DB === false){
            return array.filter(dog => !dogsDB.includes(dog))
        }
        else return array
    }
    function filterByTemperament(array){
        if (array.length && options.temperament !== 'All'){
            return array.filter(dog => dog.temperament? dog.temperament.toString().split(',').map(word => word.trim().replace(',', '')).includes(options.temperament) : null)
        } 
        else {
            return array
        }
    }
    function filterAlphabetically(array){
        if (options.order === 'asc'){
            let asc = [...array]
            asc.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            return asc;
        }
        else if (options.order === 'desc'){
            let desc = [...array]
            desc.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
            return desc;
        }
        else return array 
    }
    function findAvg(value){
        if (typeof value === 'string'){
            let arr = value.split('-') 
            return arr[0].trim()
        }
    }
    function filterByWeight(array){
        if (options.weight === "Lightest-first"){
            let lf = [...array]
            lf.sort((a, b) => findAvg(a.weight) - findAvg(b.weight));
            return lf
        }
        else if (options.weight === "Heaviest-first"){
            let hf = [...array]
            hf.sort((a, b) => findAvg(b.weight) - findAvg(a.weight));
            return hf
        }
        else return array
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    //When data is saved, assigns data to display after required filtering & applies filtering to search results
    useEffect(() => {
        if (Array.isArray(resultsRedux) && resultsRedux.length) {
            if (dogsDB) {
            let filtered = dogsDB.filter(dog => dog.name.toLowerCase().includes(searchString.toLowerCase()))
            let array = resultsRedux.concat(filtered)
            array = filertAPISearch(array)
            array = filterDB(array)
            array = filterByTemperament(array)
            array = filterAlphabetically(array)
            array = filterByWeight(array)
            setDisplay(array)
            }
        }
        else {
                let array = data
                array = filterAPI(array)
                array = filterDB(array)
                array = filterByTemperament(array)
                array = filterAlphabetically(array)
                array = filterByWeight(array)
                setDisplay(array) 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data, resultsRedux, dogsDB, searchString, srcs, options])
    
    // sets ID for API or DB data
    function chooseId(idAPI, idDB){
            if (idDB) return idDB
            else return idAPI
    }

    // Pagination
    let index = 0
    // Change page
    const paginate = (pageNumber) => setPage(pageNumber)

    //Sets value of final display following pagination rules
    useEffect(() => {
        const indexOfLastPost = page * postsPerPage
        const indexOfFirstPost = indexOfLastPost - postsPerPage
        setFinalDisplay(display.slice(indexOfFirstPost, indexOfLastPost))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[display, page])

    // Applies filters to the final display and removes loading status
    useEffect(() => {
        if (finalDisplay.length) setLoading(false)
    },[finalDisplay, srcs, options])


    return (
            <>
                {
                (loading) ? (
                        <div>
                        <img src={loadingGif} alt="loading" />
                        <p>Loading...</p>
                        </div>
                ) : (
                    <>
                        <div className='cards'>
                        {
                            finalDisplay.map(dog => <Card
                                index = {++index}
                                key={chooseId(dog.id, dog.idDB)}
                                id={chooseId(dog.id, dog.idDB)}
                                img={dog.image}
                                name={dog.name}
                                temperaments={dog.temperament}
                                weight={dog.weight}
                            />)
                        }
                        </div>
                        <Pagination 
                            postsPerPage={postsPerPage} 
                            totalPosts={display.length} 
                            paginate={paginate}
                        />
                    </>
                )
                }
            </>
    )
}

