import React from 'react'
import './Card.css';

export default function Card({img, name, temperaments}) {

        return (
        <div className='card'>

            <div className='card-body'>
                <div className='card-img'>
                    <p>{img}</p> 
                </div>
                    <h3>{name}</h3>
                    <p>{temperaments}</p>
            </div>

        </div>
    )
    

    
}
