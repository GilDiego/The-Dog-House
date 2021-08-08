import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setOptionsSelected, setSources, fetchAndMapTemperaments } from '../../redux/actions/buttonsActions'
import './Buttons.css'

export default function Buttons() {

    const [API, setAPI] = useState(true)
    const [DB, setDB] = useState(true)
    const [temperament, setTemperament] = useState('All')
    const [order, setOrder] = useState('Default')
    const [weight, setWeight] = useState('All')
    const [allTemps, setAllTemps] = useState([])

    const dispatch = useDispatch()
    // const srcs = useSelector(state => state.buttonsReducer.sources)
    // const optionsSelected = useSelector(state => state.buttonsReducer.optionsSelected)
    const temperamentsDB = useSelector(state => state.buttonsReducer.temperamentsFromDB)

    useEffect(() => {
        dispatch(setSources(API, DB))
        dispatch(setOptionsSelected(temperament, order, weight))
        dispatch(fetchAndMapTemperaments())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        dispatch(setSources(API, DB))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[API, DB])

    useEffect(() => {
        dispatch(setOptionsSelected(temperament, order, weight))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[temperament, order, weight])

    useEffect(() => {
        setAllTemps(temperamentsDB)
    }, [temperamentsDB])

    let id = 0

    return (
        <div>

            <Link to="/new"><span className="create-button">Creation Studio</span></Link>
            <form action="">
                <span className="button-row">Results from: </span>
                    <input type="checkbox" defaultChecked={true} onChange={e => setAPI(!API)} id="vehicle1" name="vehicle1" value="Bike" />
                    <label>API</label>

                    <input type="checkbox" defaultChecked={true} onChange={e => setDB(!DB)} id="vehicle1" name="vehicle1" value="Bike" />
                    <label>DB</label>
            
                <span className="button-row">Sort by: </span>
                    <label>Temperament:</label>
                    <select name="Temperaments" id="Temperaments" onChange={e => setTemperament(e.target.value)}>
                        <option value="All">All</option>
                        {
                            allTemps.map( temp => <option key={id++} value={temp}>{temp}</option>)
                        }
                    </select>

                    <label>Order:</label>
                    <select name="Order" id="Order" onChange={e => setOrder(e.target.value)}>
                        <option value="Default">Default</option>
                        <option value="asc">A - Z</option>
                        <option value="desc">Z - A</option>
                    </select>

                    <label>Weight:</label>
                    <select name="Weight" id="Weight" onChange={e => setWeight(e.target.value)}>
                        <option value="Default">Default</option>
                        <option value="Lightest-first">Lightest first</option>
                        <option value="Heaviest-first">Heaviest first</option>
                    </select>
{/* 
                <input type="submit" onSubmit={e => handleSubmit()} value="Save" /> */}
            </form>
        </div>
    )
}
