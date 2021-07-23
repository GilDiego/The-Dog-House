import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, searchDogs } from '../redux/actions/actions';
import Card from './Card/Card'


export default function Cards() {

    const [dogs, setDogs] = useState([])
    // Redux hooks
    const dispatch = useDispatch()
    const dogsRedux = useSelector(state => state.dogsLoaded)

    // Preloads info to show when component mounts
    useEffect(()=>{
        dispatch(getDogs())
    },[])


    if (dogsRedux.length > 0) {
        return (
            <>
            {
                dogsRedux.map(dog => <Card 
                img={dog.image}
                name={dog.name}
                temperaments={dog.temperament}
                />)
            }
            </>
        )
    }
    else return <img src="client\src\media\loading2.gif" alt="Loading" />
}
