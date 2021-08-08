import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css';



export default function Header2() {

    return (
        <div className='jumbotron'>
            <Link to='/home'>
                <p className='title'> The Dog House</p>
            </Link>
            
        <div className='splitter'><Link to="/new">
                <span className="create-new">Creation Studio</span>
            </Link></div>
        </div>
    )
}
