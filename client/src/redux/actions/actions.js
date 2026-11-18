import { API_URL } from '../../config';

export const GET_DOGS = 'GET_DOGS';
export const SEARCH_DOGS = 'SEARCH_DOGS';
export const SEARCH_ID = 'SEARCH_ID';
export const POST_DOG = 'POST_DOG';
export const SAVE_SEARCH = 'SAVE_SEARCH';

const load = (path, type) => (dispatch) =>
  fetch(`${API_URL}${path}`)
    .then((response) => response.json())
    .then((payload) => dispatch({ type, payload }));

export const getDogs = () => load('/dogs', GET_DOGS);

export const searchDogs = (name) => (dispatch) => {
  if (!name) return dispatch({ type: SEARCH_DOGS, payload: [] });

  return load(`/dogs?name=${encodeURIComponent(name)}`, SEARCH_DOGS)(dispatch);
};

export const searchId = (id) => load(`/dogs/${id}`, SEARCH_ID);

export const saveSearch = (search) => ({ type: SAVE_SEARCH, payload: search });
