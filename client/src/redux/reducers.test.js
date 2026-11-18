import dogsReducer from './reducers/reducers';
import buttonsReducer from './reducers/buttonsReducer';
import { GET_DOGS, SEARCH_DOGS, SEARCH_ID, saveSearch } from './actions/actions';
import {
  FETCH_DB,
  FETCH_TEMPERAMENTS,
  setSources,
  setOptionsSelected,
  mapTemperaments,
} from './actions/buttonsActions';

describe('dogsReducer', () => {
  const initial = dogsReducer(undefined, { type: '@@INIT' });

  it('starts empty', () => {
    expect(initial).toEqual({ dogsLoaded: [], dogsSearched: [], dogById: {}, search: {} });
  });

  it.each([
    [GET_DOGS, 'dogsLoaded', [{ id: 1 }]],
    [SEARCH_DOGS, 'dogsSearched', [{ id: 2 }]],
    [SEARCH_ID, 'dogById', { id: 3 }],
  ])('stores the payload of %s', (type, key, payload) => {
    expect(dogsReducer(initial, { type, payload })[key]).toEqual(payload);
  });

  it('remembers the last search', () => {
    expect(dogsReducer(initial, saveSearch('akita')).search).toBe('akita');
  });

  it('ignores unknown actions', () => {
    expect(dogsReducer(initial, { type: 'UNKNOWN' })).toBe(initial);
  });
});

describe('buttonsReducer', () => {
  const initial = buttonsReducer(undefined, { type: '@@INIT' });

  it('stores the stored dogs and temperaments', () => {
    expect(buttonsReducer(initial, { type: FETCH_DB, payload: [{ id: 1 }] }).dogsFromDB).toEqual([
      { id: 1 },
    ]);
    expect(
      buttonsReducer(initial, { type: FETCH_TEMPERAMENTS, payload: ['Loyal'] }).temperamentsFromDB
    ).toEqual(['Loyal']);
  });

  it('stores the selected sources and options', () => {
    let state = buttonsReducer(initial, setSources(true, false));
    state = buttonsReducer(state, setOptionsSelected('Loyal', 'asc', 'Lightest-first'));

    expect(state.sources).toEqual({ API: true, DB: false });
    expect(state.optionsSelected).toEqual({
      temperament: 'Loyal',
      order: 'asc',
      weight: 'Lightest-first',
    });
  });
});

describe('mapTemperaments', () => {
  it('returns sorted names without the undefined placeholder', () => {
    const names = mapTemperaments([{ name: 'Loyal' }, { name: 'undefined' }, { name: 'Alert' }]);

    expect(names).toEqual(['Alert', 'Loyal']);
  });
});
