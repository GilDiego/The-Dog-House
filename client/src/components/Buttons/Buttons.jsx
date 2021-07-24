import React from 'react'
import './Buttons.css'

export default function Buttons() {
    return (
        <div>
            <form action="">
                <span className="button-row">Show from: </span>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                    <label for="vehicle1"> API</label>

                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                    <label for="vehicle1"> DB</label>
                <br />
                <span className="button-row">Sort by: </span>
                    <label for="Temperaments">Temperament:</label>
                    <select name="Temperaments" id="Temperaments">
                        <option value="volvo">All</option>
                    {/* Needs to map all temperaments to show options */}
                        <option value="volvo">Stubborn</option>
                        <option value="saab">Curious</option>
                    </select>

                    <label for="Alphabetic">Alphabetic:</label>
                    <select name="Alphabetic" id="Alphabetic">
                        <option value="A-Z">A - Z</option>
                        <option value="Z-A">Z - A</option>
                    </select>

                    <label for="Weight">Weight:</label>
                    <select name="Weight" id="Weight">
                        <option value="Lightest-first">Lightest first</option>
                        <option value="Heaviest-first">Heaviest first</option>
                    </select>

                <input type="submit" value="Fetch!" />
            </form>
        </div>
    )
}
