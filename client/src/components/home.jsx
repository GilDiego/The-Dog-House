import './home.css';
import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDogs } from '../redux/actions/actions';

export default function Home () {

    // Component states
    const [dogs, setDogs] = useState([])
    // Redux hooks
    const dispatch = useDispatch()
    const dogsRedux = useSelector(state => state.dogsLoaded)

    // Preloads info to show when component mounts
    useEffect(()=>{
        dispatch(getDogs())
    },[])


    return (
        
        <>
        <h1> Estas en home</h1>

        {/* Search form */}
        <form onSubmit={(e) => {
            e.preventDefault();
            
            }}>
            <input
                type="text"
                placeholder="Search for dogs"
            />
            <input type="submit" value="Search" />
        </form>

        {/* Display state of dogs */}
        <div>
            <ul>
                {
                    dogsRedux.map(dog => (
                        <>
                        <ul>{dog.image}</ul>
                        <li>{dog.name}</li>
                        <li>{dog.temperament}</li>
                        </>
                    ))
                }
            </ul>
        </div>




        </>
    )

}

