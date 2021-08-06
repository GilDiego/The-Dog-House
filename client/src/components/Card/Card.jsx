import React from 'react';
import {Link} from 'react-router-dom'
import './Card.css';
import placeholder from '../../media/silhouette.png'

// cuando click se actualiza el estado global con el id del perro, y con Link 
// cambio a /details que renderiza con base al estado global

export default function Card({id, img, name, temperaments, weight}) {

    // If image from API is not a .jpg, replaces for src to include .png
    function replaceSrc(e, img){
        if (!img) e.target.src = placeholder
        else e.target.src = (`https://cdn2.thedogapi.com/images/${img}.png`)
    }

        return (
        <div className='card'>
            
            <div className='card-body'>
                <div className='card-img'>
                    {
                        ((typeof id === 'string') ? (
                            <img className='card-img' src={placeholder} alt={name} />
                        ) : (
                            <img className='card-img' src={`https://cdn2.thedogapi.com/images/${img}.jpg`}
                                onError={e => replaceSrc(e, img)}
                                alt={name}
                            />  
                        ))
                    }
                </div>
                    <Link to={{
                        pathname: '/details',
                        state: {id}
                    }}>
                    <h3>{name}</h3>
                    </Link>
                    <p>{temperaments || 'No data'}</p>
                    <p>{weight || 'No data'} kilograms</p>
            </div>

        </div>
    )
    

    
}
