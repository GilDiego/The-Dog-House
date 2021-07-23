import './home.css';
import React from 'react';
// import { useState, useEffect} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getDogs, searchDogs } from '../redux/actions/actions';
import Cards from './Cards';
import Searchbar from './Searchbar';

export default function Home () {

    // // Component states
    // const [dogs, setDogs] = useState([])
    // // Redux hooks
    // const dispatch = useDispatch()
    // const dogsRedux = useSelector(state => state.dogsLoaded)

    // // Preloads info to show when component mounts
    // useEffect(()=>{
    //     dispatch(getDogs())
    // },[])

    return (
        
        <>
        <h1> Estas en home</h1>

        <Searchbar/>
        <Cards/>


        </>
    )  
} 
