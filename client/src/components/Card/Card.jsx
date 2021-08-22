import React from 'react';
import {Link} from 'react-router-dom'
import './Card.css';
import placeholder from '../../media/silhouette.png'


export default function Card({id, img, name, temperaments, weight}) {

    // If image from API is not a .jpg, replaces for src to include .png
    function replaceSrc(e, img){
        if (!img) e.target.src = placeholder
        else e.target.src = (`https://cdn2.thedogapi.com/images/${img}.png`)
    }

        return (
        <div className='card'>
            <div className='card-body'>
            <div className="top-half">
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
                </div></div>
                    <div className="card-text">
                        <Link to={{
                            pathname: '/details',
                            state: {id}
                        }}>
                        <h3>{name}</h3>
                        </Link>
                        <p>{temperaments || 'No data'}</p>
                        {/* <p>{weight || 'No data'} kilograms</p> */}
                    </div>
            </div>

        </div>
    )
    

    
}
