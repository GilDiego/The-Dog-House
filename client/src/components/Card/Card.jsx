import React,  { useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Details from '../Details/Details.jsx'
import { searchDogs, searchId } from '../../redux/actions/actions';
import './Card.css';

// cuando click se actualiza el estado global con el id del perro, y con Link 
// cambio a /details que renderiza con base al estado global

export default function Card({id, img, name, temperaments}) {

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
            </div>

        </div>
    )
    

    
}
