import React, {useState, useEffect}from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { searchId } from '../../redux/actions/actions';
import loadingGif from '../../media/loading1.gif'
import placeholder from '../../media/silhouette.png'
import './Details.css';


export default function Details () {
    const [dog, setDog] = useState([])
    const [loading, setLoading] = useState(true)

    //Redux Hooks
    const dispatch = useDispatch()
    const dogObject = useSelector(state => state.dogsReducer.dogById)
    const dogsDB = useSelector(state => state.buttonsReducer.dogsFromDB)
    
    // React location hook
    const location = useLocation()
    const { id } = location.state

    // Dispatches get from API, or sets dog if id type is from DB
    useEffect(() => {
        // if id doesn't match anything in API or DB return error
        if (typeof id !== 'string') dispatch(searchId(id))
        else {
            let array = dogsDB
            array = array.filter(dog => dog.idDB === id)
            setDog(array[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // If dog is loaded from API, sets dog state using the API response
    useEffect(() => {
        if (dogObject.id === id) setDog(dogObject)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dogObject])

    // If information is ready to display, removes loading state
    useEffect(() => {
        if (dog.id === id || dog.idDB === id) setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dog])

    return (
            <>
                {
                (loading) ? (
                    <>
                        <div className='loading'>
                            <img src={loadingGif} alt="loading" />
                            <p>Loading...</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="container">
                            {
                                (dog.idDB) ? (
                                    <img className='large-img' src={placeholder} alt={dog.name} />
                                ) : (
                                    <img className='large-img' src={`https://cdn2.thedogapi.com/images/${dogObject.image.id}.jpg`} alt="" />
                                )
                            }
                            <h1>{dog.name}</h1> 
                            <div className="data">
                            {
                                (dog.temperament) ? (
                                    <p>Known for being: {dog.temperament}</p>
                                ) : (
                                    <p>No information about this dog's temperament.</p>
                                )
                            }
                                <p>Weights {dog.weight.metric || dog.weight} kilograms.</p>
                                <p>Is usually {dog.height.metric || dog.height} centimeters tall.</p>
                            {
                            (dog.idDB) ? (
                                <p>Average life-span is {dog.life_span} years.</p>
                            ) : (
                                <p>Average life-span is {dog.life_span}.</p>
                            )
                            }
                            </div>
                        </div>
                        <div className='buttonContainer'>
                            <Link to="/home">
                                <button className='button' > ← Home</button>
                            </Link>
                        </div>
                    </>
                )
                }
            </>
    )
}