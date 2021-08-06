import './Cards.css';
import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDogs } from '../../redux/actions/actions';
import { fetchDB } from '../../redux/actions/buttonsActions';
import Card from '../Card/Card.jsx'
import loading from '../../media/loading1.gif'
// import Pagination from '../Pagination/Pagination.jsx';


export default function Cards() {
    const [display, setDisplay] = useState([])
    // const [pages, setPages] = useState(0)
    const [finalDisplay, setFinal] = useState([])
    const [displaySearch, setDisplaySearch] = useState([])
    // const [finalSearch, SetFinalSearch] = useState([])


    const dispatch = useDispatch()
    const dogsRedux = useSelector(state => state.dogsReducer.dogsLoaded)
    const resultsRedux = useSelector(state => state.dogsReducer.dogsSearched)
    const dogsDB = useSelector(state => state.buttonsReducer.dogsFromDB)

    const srcs = useSelector(state => state.buttonsReducer.sources)
    const optionsSelected = useSelector(state => state.buttonsReducer.optionsSelected)

    // useEffect(() =>{
    //     setPages(0)
    //     let counter = 0
    //     finalDisplay.forEach(dog => counter++)
    //     counter = (counter / 8)
    //     setPages(counter)
    // },[finalDisplay, displaySearch])

    useEffect(()=>{
        dispatch(getDogs())
        dispatch(fetchDB())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    // concats arrays to display
    useEffect(() => {
        if (dogsDB.length && dogsRedux.length) return setDisplay(dogsDB.concat(dogsRedux))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dogsRedux, dogsDB])

    // sets final display 
    useEffect(() => {
        setFinal(display)
    }, [display])

    // if search, generates displaySearch values
    useEffect(() => {
        return setDisplaySearch(resultsRedux) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [resultsRedux])
    
    //////////////////////////////////// Sources and Filter functions ////////////////////////////////
    function filterAPI(array){
        if (srcs.API === false){
            return array.filter(dog => !dogsRedux.includes(dog))
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
        if (optionsSelected.temperament !== 'All'){
            return array.filter(dog => {
                if (dog.temperament){
                    return dog.temperament.toString().split(',').map(word => word.trim().replace(',', '')).includes(optionsSelected.temperament)
                }
                else return false
            })
        } 
        else return array
    }
    function filterAlphabetically(array){
        if (optionsSelected.order === 'A-Z'){
            return array.sort((a, b) => b.name.localeCompare(a.name));
        }
        else if (optionsSelected.order === 'Z-A'){
            return array.sort((a, b) => a.name.localeCompare(b.name));
        }
        else return array
    }
    function findAvg(value){
        if (typeof value === 'string'){
            let arr = value.split('-')
            let res = (Number(arr[0]) + Number(arr[1]))/2
            return parseInt(res).toString()
        }
    }
    function filterByWeight(array){
        if (optionsSelected.weight === "Lightest-first"){
            return array.sort((a, b) => findAvg(a.weight).localeCompare(findAvg(b.weight)));
        }
        else if (optionsSelected.weight === "Heaviest-first"){
            return array.sort((a, b) => findAvg(b.weight).localeCompare(findAvg(a.weight)));
        }
        else return array
    }
    //////////////////////////////////// End of Filter functions ////////////////////////////////

    // filter finalDisplay by sources and options selected
    useEffect(() => {
        if (dogsDB.length && dogsRedux.length && display.length){
            let result = display
            result = filterAPI(result)
            result = filterDB(result)
            result = filterByTemperament(result)
            result = filterAlphabetically(result)
            result = filterByWeight(result)
            setFinal(result)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [srcs, optionsSelected])


    // sets ID for API or DB data
    function chooseId(idAPI, idDB){
        if (idDB) return idDB
        else return idAPI
    }
    return (
        (displaySearch.length < 1) ? (
            (finalDisplay.length < 1) ? ( <div> <img src={loading} alt="loading" /> <p>Loading...</p> </div>) : (
                <div className='main'>
                        <div className='gridItem'>   
                            {
                                finalDisplay.map(dog => <Card
                                    key={chooseId(dog.id, dog.idDB)}
                                    id={chooseId(dog.id, dog.idDB)}
                                    img={dog.image}
                                    name={dog.name}
                                    temperaments={dog.temperament}
                                    weight={dog.weight}
                                />)
                            }
                        </div>
                        {/* <Pagination number={pages}/> */}
                    </div>
            )
        ) : (
                (displaySearch === 'No search queries.' ) ? (<p>No matches. Sad doggo</p>) : (
                    
                    <div className='gridItem'>   
                            {
                                displaySearch.map(dog => <Card 
                                    key= {chooseId(dog.id, dog.idDB)}
                                    id={chooseId(dog.id, dog.idDB)}
                                    img={dog.image}
                                    name={dog.name}
                                    temperaments={dog.temperament}
                                />)
                            }
                        {/* <Pagination number={pages}/> */}
                    </div>
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
        