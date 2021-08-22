import React, { useEffect } from 'react'
import './Pagination.css'

export default function Pagination({ postsPerPage, totalPosts, paginate }) {

    // Calculates the amount of page numbers to be rendered
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)    
    }

    // On mount, sets page 1 to active className
    useEffect(() =>{
        let btnContainer = document.getElementsByClassName("page-number");
        btnContainer[0].classList.add('active')
    },[])

    // When another page is clicked, clears active className and sets it in the new page
    function current(e){
        let btnContainer = document.getElementsByClassName("page-number");
        for (let i = 0; i < btnContainer.length; i++) {
            if(btnContainer[i].classList.contains('active')) btnContainer[i].classList.remove('active')          
        }
        e.target.className = 'page-number active'
    }    

    return (
        <div>
            <ul className="pagination">
            {
                pageNumbers.map(number => (
                        <li 
                            className='page-number' 
                            onClick={(e) => {
                                paginate(number)
                                current(e)
                                
                            }}
                            href="/home"
                            key={number}>
                            {number}
                        </li>
                ))
            }
            </ul>
        </div>
    )
}
