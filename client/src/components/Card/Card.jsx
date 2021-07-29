import React from 'react';
import {Link} from 'react-router-dom'
import './Card.css';

// cuando click se actualiza el estado global con el id del perro, y con Link 
// cambio a /details que renderiza con base al estado global

export default function Card({id, img, name, temperaments, weight}) {

        return (
        <div className='card'>
            
            <div className='card-body'>
                <div className='card-img'>
                    <p>{img}</p> 
                </div>
                    <Link to={{
                        pathname: '/details',
                        state: {id}
                    }}>
                    <h3>{name}</h3>
                    </Link>
                    <p>{temperaments}</p>
                    {/* <p>{weight} kilograms</p> */}
            </div>

        </div>
    )
    

    
}
