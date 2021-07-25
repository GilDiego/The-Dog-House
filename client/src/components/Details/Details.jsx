import React, {useEffect}from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { searchId } from '../../redux/actions/actions';
import './Details.css';


// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] Años de vida


export default function Details () {
    //Redux Hooks
    const dispatch = useDispatch()
    const dogObject = useSelector(state => state.dogById)
    

    // React location hook
    const location = useLocation()
    const { id } = location.state

    useEffect(() => {
        dispatch(searchId(id))
    },[])

    return (
        (dogObject.id === id) ? (
        <>
            <div className="container">
                <div className="img"> {dogObject.image.id}</div>

                <h1>{dogObject.name}</h1> 

                <div className="data">
                    <p>{dogObject.temperament}</p>
                    <p>{dogObject.height.metric} kilograms.</p>
                    <p>{dogObject.weight.metric} meters.</p>
                    <p>{dogObject.life_span}</p>
                </div>
            </div>

            <Link to="/home">
                <button> ← Home</button>
            </Link>

        </>
        ) : (
            <img src="../../media/loading1.gif" alt="Loading Gif..." />
        )
    )

}