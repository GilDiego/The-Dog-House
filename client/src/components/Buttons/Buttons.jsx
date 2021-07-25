import React from 'react'
import './Buttons.css'

export default function Buttons() {
    return (
        <div>
            <form action="">
                <span className="button-row">Results from: </span>
                    <input type="checkbox" defaultChecked={true} id="vehicle1" name="vehicle1" value="Bike" />
                    <label> API</label>

                    <input type="checkbox" defaultChecked={true} id="vehicle1" name="vehicle1" value="Bike" />
                    <label>DB</label>
            
                <span className="button-row">Sort by: </span>
                    <label>Temperament:</label>
                    <select name="Temperaments" id="Temperaments">
                        <option value="volvo">All</option>
                    {/* Needs to map all temperaments to show options */}
                        <option value="volvo">Stubborn</option>
                        <option value="saab">Curious</option>
                    </select>

                    <label>Order:</label>
                    <select name="Order" id="Order">
                        <option value="A-Z">A - Z</option>
                        <option value="Z-A">Z - A</option>
                    </select>

                    <label>Weight:</label>
                    <select name="Weight" id="Weight">
                        <option value="Lightest-first">Lightest first</option>
                        <option value="Heaviest-first">Heaviest first</option>
                    </select>

                <input type="submit" value="Fetch!" />
            </form>
        </div>
    )
}
