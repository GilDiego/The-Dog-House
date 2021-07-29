import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAndMapTemperaments } from '../../redux/actions/buttonsActions';


export default function NewDog () {
    const [editing, setEditing] = useState(true)
    const [errors, setErrors] = useState({})
    const [temps, setTemps] = useState([])
    const [input, setInput] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life_span: '',
        image: 'img',
        temperament: ""
    })
    const dispatch = useDispatch()
    const temperamentsDB = useSelector(state => state.buttonsReducer.temperamentsFromDB)

    useEffect(() => {
        dispatch(fetchAndMapTemperaments())
        setEditing(true)
        setTemps([])
    },[])

    
    function handleInputChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
            });
        
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
            }));
    }
    function validate(input){
        let errors = {};
        // if (!input.name) {
        //     errors.name = 'Name is required.';
        // } else 
        if (!(/^[a-zA-Z]+$/).test(input.name)) {
            errors.name = 'Name must contain only letters.';
        }
        // if (!input.minHeight) {
        //     errors.minHeight = 'Minimum height is required.';
        // } else 
        if (!(/(?<=^| )\d+(\d*\.?\d*)?(?=$| )/).test(input.minHeight)) {
            errors.minHeight = 'Minimum height must contain only numbers (with or without periods).';
        }
        // if (!input.maxHeight) {
        //     errors.maxHeight = 'Maximum height is required.';
        // } else 
        if (!(/(?<=^| )\d+(\d*\.?\d*)?(?=$| )/).test(input.maxHeight)) {
            errors.maxHeight = 'Maximum height must contain only numbers (with or without periods).';
        }
        // if (!input.minWeight) {
        //     errors.minWeight = 'Minimum weight is required.';
        // } else 
        if (!(/(?<=^| )\d+(\d*\.?\d*)?(?=$| )/).test(input.minWeight)) {
            errors.minWeight = 'Minimum weight must contain only numbers (with or without periods).';
        }
        // if (!input.maxWeight) {
        //     errors.maxWeight = 'Maximum weight is required.';
        // } else 
        if (!(/(?<=^| )\d+(\d*\.?\d*)?(?=$| )/).test(input.maxWeight)) {
            errors.maxWeight = 'Maximum weight must contain only numbers (with or without periods).';
        }
        // if (!input.lifeSpan) {
        //     errors.lifeSpan = 'Life-span is required.';
        // } else 
        if (!(/^[0-9]*$/).test(input.life_span)) {
            errors.life_span = 'Life-span must contain only numbers.';
        }
        return errors;
    }
    function createNew(e){
        e.preventDefault();
        setEditing(true)
    }
    function addTemperament(e){
        e.preventDefault();
        let select = document.getElementById('temperament')
        let value = select.options[select.selectedIndex].value;
        setTemps([...temps, value])
    }
    function submitForm(e){
            e.preventDefault();
            setEditing(false)
            fetch('http://localhost:3001/dog',{
                method: 'POST',
                headers:{'Content-type': 'application/json'},
                body:JSON.stringify(input)
            })
            setTemps([])
            setInput({
                name: '',
                minHeight: '',
                maxHeight: '',
                minWeight: '',
                maxWeight: '',
                life_span: '',
                image: 'img',
                temperament: ""
            })
    }


    let id = 0
    return (
            (editing) ? (
                <>
                    <p>All fields are required.</p>
                    <form>
                        
                        <div>
                            <label>Name:</label>
                            <input type="text" name="name" placeholder='Doggo' autoComplete='off' onChange={e => handleInputChange(e)} />
                            {errors.name && (
                                <p className="danger">{errors.name}</p>
                            )}
                        </div>
                        <div>
                            <label>Minimum height:</label>
                            <input type="text" name="minHeight" placeholder='1' autoComplete='off' onChange={e => handleInputChange(e)} />
                            <label> meter(s).</label>
                            {errors.minHeight && (
                                <p className="danger">{errors.minHeight}</p>
                            )}
                        </div>
                        <div>
                            <label>Maximum height:</label>
                            <input type="text" name="maxHeight" placeholder='1.5' autoComplete='off' onChange={e => handleInputChange(e)} />
                            <label> meter(s).</label>
                            {errors.maxHeight && (
                                <p className="danger">{errors.maxHeight}</p>
                            )}
                        </div>
                        <div>
                            <label>Minimum weight:</label>
                            <input type="text" name="minWeight" placeholder='5' autoComplete='off' onChange={e => handleInputChange(e)} />
                            <label> kilogram(s).</label>
                            {errors.minWeight && (
                                <p className="danger">{errors.minWeight}</p>
                            )}
                        </div>
                        <div>
                            <label>Maximum weight:</label>
                            <input type="text" name="maxWeight" placeholder='8' autoComplete='off' onChange={e => handleInputChange(e)} />
                            <label> kilogram(s).</label>
                            {errors.maxWeight && (
                                <p className="danger">{errors.maxWeight}</p>
                            )}
                        </div>
                        <div>
                            <label>Life-span:</label>
                            <input type="text" name="life_span" placeholder='10' autoComplete='off' onChange={e => handleInputChange(e)} />
                            {errors.life_span && (
                                <p className="danger">{errors.life_span}</p>
                            )}
                            {/* <label> - </label>
                            <input type="text" name="maxLifeSpan" placeholder='15' autoComplete='off' onChange={e => handleInputChange(e)} /> */}
                            <label> years.</label>
                            {/* {errors.username && (
                                <p className="danger">{errors.maxLifeSpan}</p>
                            )} */}
                        </div>
                        <div>
                            <label>Select temperaments:</label>
                            <select name="temperament" id="temperament" onChange={e => handleInputChange(e)}>
                                {
                                    temperamentsDB.map( temp => <option key={id++} value={temp}>{temp}</option>)
                                }
                            </select>
                                <button onClick={e => addTemperament(e)}>Add</button>
                                <div> 
                                    <p>Selected temperaments:</p> 
                                    <ul>
                                        {   
                                            temps.map(temp => <li key={temp}>{temp}</li>)
                                        }
                                    </ul>
                                </div>
                        </div>
                        
                        <button onClick={e => submitForm(e)}>Create!</button>
                    </form>
                </>
            ) : (
                <>
                    <p>Success! *gif de success*</p>
                    <Link to='/home'>
                        <button>← Home</button>
                    </Link>
                    <button onClick={e => createNew(e)}>Create more!</button>
                </>
            )

        
    )

}