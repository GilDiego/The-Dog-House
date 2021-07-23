import './landingPage.css';
import React from 'react';
import { Link } from 'react-router-dom'

export default function LandingPage () {
    return (
        <div className= "lp">
        <Link to='/home'>
        <button>Let the dogs in!</button>
        </Link>
        </div>
    )

}