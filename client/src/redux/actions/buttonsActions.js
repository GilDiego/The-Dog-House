import { API_URL } from '../../config';

export const FETCH_DB = 'FETCH_DB';
export const SET_OPTIONS = 'SET_OPTIONS';
export const SET_SOURCES = 'SET_SOURCES';
export const FETCH_TEMPERAMENTS = 'FETCH_TEMPERAMENTS';

export const fetchDB = () => (dispatch) =>
  fetch(`${API_URL}/dogsDB`)
    .then((response) => response.json())
    .then((payload) => dispatch({ type: FETCH_DB, payload }));

export const setSources = (API, DB) => ({ type: SET_SOURCES, payload: { API, DB } });

export const setOptionsSelected = (temperament, order, weight) => ({
  type: SET_OPTIONS,
  payload: { temperament, order, weight },
});

export const mapTemperaments = (temperaments) =>
  temperaments
    .map((temperament) => temperament.name)
    .filter((name) => name !== 'undefined')
    .sort((a, b) => a.localeCompare(b));

export const fetchAndMapTemperaments = () => (dispatch) =>
  fetch(`${API_URL}/temperament`)
    .then((response) => response.json())
    .then((json) => dispatch({ type: FETCH_TEMPERAMENTS, payload: mapTemperaments(json) }));
