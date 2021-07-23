import React from 'react'

export default function Searchbar() {
    return (
        <div>
            <form onSubmit={(e) => {
            e.preventDefault();
            
            }}>
            <input
                type="text"
                placeholder="Search for dogs"
            />
            <input type="submit" value="Search" />
        </form>
        </div>
    )
}
