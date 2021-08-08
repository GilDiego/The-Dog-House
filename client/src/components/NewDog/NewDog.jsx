import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAndMapTemperaments } from '../../redux/actions/buttonsActions';
import './NewDog.css';
import gif from '../../media/success.gif'


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        if (input.name){
        if (!(/^[a-zA-Z]+$/).test(input.name)) {
            errors.name = 'Name must contain only letters.';
        }}

        if (input.minHeight){
        if (!(/(?<=^| )\d+(\d*\.?\d*)?(?=$| )/).test(input.minHeight)) {
            errors.minHeight = 'Minimum height must contain only numbers (with or without periods).';
        }}

        if (input.maxHeight){
        if (!(/(?<=^| )\d+(\d*\.?\d*)?(?=$| )/).test(input.maxHeight)) {
            errors.maxHeight = 'Maximum height must contain only numbers (with or without periods).';
        }}

        if (input.minWeight){
        if (!(/(?<=^| )\d+(\d*\.?\d*)?(?=$| )/).test(input.minWeight)) {
            errors.minWeight = 'Minimum weight must contain only numbers (with or without periods).';
        }}

        if (input.maxWeight){
        if (!(/(?<=^| )\d+(\d*\.?\d*)?(?=$| )/).test(input.maxWeight)) {
            errors.maxWeight = 'Maximum weight must contain only numbers (with or without periods).';
        }}

        if (input.life_span){
        if (!(/^[0-9]*$/).test(input.life_span)) {
            errors.life_span = 'Life-span must contain only numbers.';
        }}

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
            // si todos los estados y name no se repite en la BD entonces mandar post
            if (input.name.length && input.minHeight.length && input.maxHeight.length && input.minWeight.length && input.maxWeight.length && input.life_span.length && temps.length) {
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
            else alert('All fields are required.')
            
    }


    let id = 0
    return (
            (editing) ? (
                <div className="main">
                    <h3 className='creation-title'>Creation Studio</h3>
                    <p className='alert'>**All fields are required.</p>
                    <form className='form'>
                    <br />
                        
                        <div>
                            <label className='element'>Name:</label>
                            <input className='field' type="text" size='10' name="name" placeholder='Doggo' autoComplete='off' onChange={e => handleInputChange(e)} />
                            
                        </div>
                        <br />
                        
                        <div>
                            <label className='element'>Minimum height:</label>
                            <input className='field' type="text" size='10' name="minHeight" placeholder='1' autoComplete='off' onChange={e => handleInputChange(e)} />
                            <label className='label'> centimeters.</label>

                        </div>
                        <br />
                        <div>
                            <label className='element'>Maximum height:</label>
                            <input className='field' type="text" size='10' name="maxHeight" placeholder='1.5' autoComplete='off' onChange={e => handleInputChange(e)} />
                            <label className='label'> centimeters.</label>
                        </div>
                        <br />
                        <div>
                            <label className='element'>Minimum weight:</label>
                            <input className='field' type="text" size='10' name="minWeight" placeholder='5' autoComplete='off' onChange={e => handleInputChange(e)} />
                            <label className='label'> kilogram(s).</label>


                        </div>
                        <br />
                        <div>
                            <label className='element'>Maximum weight:</label>
                            <input className='field' type="text" size='10' name="maxWeight" placeholder='8.4' autoComplete='off' onChange={e => handleInputChange(e)} />
                            <label className='label'> kilogram(s).</label>

                        </div>
                        <br />
                        <div>
                            <label className='element'>Life-span:</label>
                            <input className='field' type="text" size='10' name="life_span" placeholder='10' autoComplete='off' onChange={e => handleInputChange(e)} />

                            {/* <label> - </label>
                            <input type="text" name="maxLifeSpan" placeholder='15' autoComplete='off' onChange={e => handleInputChange(e)} /> */}
                            <label> years.</label>
                            {/* {errors.username && (
                                <p className="danger">{errors.maxLifeSpan}</p>
                            )} */}
                        </div>
                        <div>
                            <label className='element'>Temperament:</label>
                            <select className='temps' name="temperament" id="temperament" onChange={e => handleInputChange(e)}>
                                {
                                    temperamentsDB.map( temp => <option key={id++} value={temp}>{temp}</option>)
                                }
                            </select>
                                <button className='add' onClick={e => addTemperament(e)}>Add</button>
                                <div> 
                                    <p className='selected'>Selected temperaments:</p> 
                                    <div className='grid-container'>
                                        {   
                                            temps.map(temp => <span className='temperaments' key={temp}> {temp} </span>)
                                        }
                                    </div>
                                </div>
                        </div>
                        <div className='dangerContainer'>
                        {errors.name && (<p className="danger">{errors.name}</p>)}
                        {errors.minHeight && (<p className="danger">{errors.minHeight}</p>)}
                        {errors.maxHeight && (<p className="danger">{errors.maxHeight}</p>)}
                        {errors.minWeight && (<p className="danger">{errors.minWeight}</p>)}
                        {errors.maxWeight && (<p className="danger">{errors.maxWeight}</p>)}
                        {errors.life_span && (<p className="danger">{errors.life_span}</p>)}
                        </div>
                        
                    </form>
                        <button className='submit' onClick={e => submitForm(e)}>Create!</button>
                </div>
            ) : (
                <div className='success'>
                    <h1>Success!</h1>
                    <img className='successGif' src={gif} alt="successGif" />
                    <div className='buttonContainer'>
                    <Link to='/home'>
                        <button className='button'>← Home</button>
                    </Link>
                    <button className='button'onClick={e => createNew(e)}>Create more!</button>
                    </div>
                </div>
            )

        
    )

}