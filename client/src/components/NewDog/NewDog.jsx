import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAndMapTemperaments } from '../../redux/actions/buttonsActions';
import './NewDog.css';
import gif from '../../media/success.gif';
import { API_URL } from '../../config';
import { validateDog, isComplete } from './validate';

const EMPTY_FORM = {
  name: '',
  minHeight: '',
  maxHeight: '',
  minWeight: '',
  maxWeight: '',
  life_span: '',
  image: 'img',
  temperament: '',
};

export default function NewDog() {
  const [editing, setEditing] = useState(true);
  const [errors, setErrors] = useState({});
  const [temps, setTemps] = useState([]);
  const [input, setInput] = useState(EMPTY_FORM);
  const dispatch = useDispatch();
  const temperamentsDB = useSelector((state) => state.buttonsReducer.temperamentsFromDB);
  useEffect(() => {
    dispatch(fetchAndMapTemperaments());
    setEditing(true);
    setTemps([]);
  }, []);
  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateDog({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function createNew(e) {
    e.preventDefault();
    setEditing(true);
  }
  function addTemperament(e) {
    e.preventDefault();
    let select = document.getElementById('temperament');
    let value = select.options[select.selectedIndex].value;
    setTemps([...temps, value]);
  }
  async function submitForm(e) {
    e.preventDefault();

    if (!isComplete(input, temps)) return alert('All fields are required.');

    await fetch(`${API_URL}/dog`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(input),
    });

    setEditing(false);
    setTemps([]);
    setInput(EMPTY_FORM);
  }
  let id = 0;
  return editing ? (
    <div className="main-studio">
      <h3 className="creation-title">Creation Studio</h3>
      <p className="alert">**All fields are required.</p>
      <form className="form">
        <br />

        <div>
          <label className="element">Name:</label>
          <input
            className="field"
            type="text"
            size="10"
            name="name"
            placeholder="Doggo"
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <br />

        <div>
          <label className="element">Minimum height:</label>
          <input
            className="field"
            type="text"
            size="10"
            name="minHeight"
            placeholder="30"
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
          />
          <label className="label"> centimeters.</label>
        </div>
        <br />
        <div>
          <label className="element">Maximum height:</label>
          <input
            className="field"
            type="text"
            size="10"
            name="maxHeight"
            placeholder="50"
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
          />
          <label className="label"> centimeters.</label>
        </div>
        <br />
        <div>
          <label className="element">Minimum weight:</label>
          <input
            className="field"
            type="text"
            size="10"
            name="minWeight"
            placeholder="5"
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
          />
          <label className="label"> kilogram(s).</label>
        </div>
        <br />
        <div>
          <label className="element">Maximum weight:</label>
          <input
            className="field"
            type="text"
            size="10"
            name="maxWeight"
            placeholder="8.4"
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
          />
          <label className="label"> kilogram(s).</label>
        </div>
        <br />
        <div>
          <label className="element">Life-span:</label>
          <input
            className="field"
            type="text"
            size="10"
            name="life_span"
            placeholder="10"
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
          />

          <label> years.</label>
        </div>
        <div>
          <label className="element">Temperament:</label>
          <select
            className="temps"
            name="temperament"
            id="temperament"
            onChange={(e) => handleInputChange(e)}
          >
            {temperamentsDB.map((temp) => (
              <option key={id++} value={temp}>
                {temp}
              </option>
            ))}
          </select>
          <button className="add" onClick={(e) => addTemperament(e)}>
            Add
          </button>
          <div>
            <p className="selected">Selected temperaments:</p>
            <div className="grid-container">
              {temps.map((temp) => (
                <span className="temperaments" key={temp}>
                  {' '}
                  {temp}{' '}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="dangerContainer">
          {errors.name && <p className="danger">{errors.name}</p>}
          {errors.minHeight && <p className="danger">{errors.minHeight}</p>}
          {errors.maxHeight && <p className="danger">{errors.maxHeight}</p>}
          {errors.minWeight && <p className="danger">{errors.minWeight}</p>}
          {errors.maxWeight && <p className="danger">{errors.maxWeight}</p>}
          {errors.life_span && <p className="danger">{errors.life_span}</p>}
        </div>
      </form>
      <button className="button create-btn" onClick={(e) => submitForm(e)}>
        Create!
      </button>
    </div>
  ) : (
    <div className="success">
      <h1>Success!</h1>
      <img className="successGif" src={gif} alt="successGif" />
      <div className="buttonContainer">
        <Link to="/home">
          <button className="button">← Home</button>
        </Link>
        <button className="button" onClick={(e) => createNew(e)}>
          Create more!
        </button>
      </div>
    </div>
  );
}
