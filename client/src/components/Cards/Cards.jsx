import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDogs } from '../../redux/actions/actions';
import Card from '../Card/Card.jsx'


export default function Cards() {

    // const [dogs, setDogs] = useState([])
    // Redux hooks
    const dispatch = useDispatch()
    const dogsRedux = useSelector(state => state.dogsLoaded)
    const resultsRedux = useSelector(state => state.dogsSearched)

    // Preloads info to show when component mounts
    useEffect(()=>{
        dispatch(getDogs())
    },[])

    return (
    (resultsRedux.length > 0) ? (
            <>
                {
                    resultsRedux.map(dog => <Card 
                        key={dog.id}
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
                    img={dog.image}
                    name={dog.name}
                    temperaments={dog.temperament}
                />)
            }
            </>
        )
    )
}
    // else return <img src="../../media/loading1.gif" alt="Loading" />

