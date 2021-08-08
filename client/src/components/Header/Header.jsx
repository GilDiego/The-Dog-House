import React from 'react'
import {Link} from 'react-router-dom'
import Searchbar from '../SearchBar/SearchBar.jsx';
import './Header.css';



export default function Header({state}) {

    return (
        <div className='jumbotron'>
            <Link to='/home'>
            <p className='title'> The Dog House</p>
            </Link>
            <div className='splitter'>&nbsp;</div>
            <span className='searchbar'><Searchbar /></span>
        </div>
    )
}
