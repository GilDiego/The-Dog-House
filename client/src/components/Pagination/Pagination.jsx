import React from 'react'

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = []


    for (let i = 1; i < Math.ceil(totalPosts / postsPerPage)+1; i++) {
        pageNumbers.push(i)    
    }

    // Reduces the amount of buttons for changing pages
    // function stylePagination(pageNumbers){
    //     if (pageNumbers.length > 4){
    //         for (let i = 1; i < pageNumbers.length; i++) {
    //             if (i = 6){
                    
    //             }
                
    //         }
    //     } 
    //     else return
    // }


    return (
        <div>
            {
                pageNumbers.map(number => (
                    <button onClick={() => paginate(number)} href="/home" key={number}>{number} </button>
                    
                ))
            }
        </div>
    )
}
