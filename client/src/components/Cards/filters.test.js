import {
  filterAPI,
  filterAPISearch,
  filterDB,
  filterByTemperament,
  filterAlphabetically,
  filterByWeight,
  minimumWeight,
} from './filters';

const akita = { name: 'akita', temperament: 'Docile, Alert, Loyal', weight: '25 - 40' };
const beagle = { name: 'Beagle', temperament: 'Curious, Playful', weight: '9 - 11' };
const mine = { name: 'Zippy', temperament: 'Alert', weight: '5 - 8' };
const noTemperament = { name: 'Mystery', weight: '1 - 2' };

describe('source filters', () => {
  const dogs = [akita, mine];

  it('keeps everything when the sources are enabled', () => {
    expect(filterAPI(dogs, { API: true }, [akita])).toBe(dogs);
    expect(filterDB(dogs, { DB: true }, [mine])).toBe(dogs);
    expect(filterAPISearch(dogs, { API: true }, [mine])).toBe(dogs);
  });

  it('drops the external dogs when the API source is off', () => {
    expect(filterAPI(dogs, { API: false }, [akita])).toEqual([mine]);
  });

  it('keeps only stored dogs in a search when the API source is off', () => {
    expect(filterAPISearch(dogs, { API: false }, [mine])).toEqual([mine]);
  });

  it('drops the stored dogs when the database source is off', () => {
    expect(filterDB(dogs, { DB: false }, [mine])).toEqual([akita]);
  });
});

describe('filterByTemperament', () => {
  const dogs = [akita, beagle, mine, noTemperament];

  it('keeps the dogs with the chosen temperament', () => {
    expect(filterByTemperament(dogs, { temperament: 'Alert' })).toEqual([akita, mine]);
  });

  it('returns everything for All', () => {
    expect(filterByTemperament(dogs, { temperament: 'All' })).toBe(dogs);
  });

  it('ignores dogs without temperament', () => {
    expect(filterByTemperament(dogs, { temperament: 'Playful' })).toEqual([beagle]);
  });
});

describe('filterAlphabetically', () => {
  const dogs = [mine, akita, beagle];

  it('sorts ascending ignoring case', () => {
    expect(filterAlphabetically(dogs, { order: 'asc' }).map((d) => d.name)).toEqual([
      'akita',
      'Beagle',
      'Zippy',
    ]);
  });

  it('sorts descending', () => {
    expect(filterAlphabetically(dogs, { order: 'desc' }).map((d) => d.name)).toEqual([
      'Zippy',
      'Beagle',
      'akita',
    ]);
  });

  it('does not mutate the original list', () => {
    const original = [...dogs];

    filterAlphabetically(dogs, { order: 'asc' });

    expect(dogs).toEqual(original);
  });

  it('returns the list untouched without an order', () => {
    expect(filterAlphabetically(dogs, {})).toBe(dogs);
  });
});

describe('weight', () => {
  it('reads the lower bound of a weight range', () => {
    expect(minimumWeight('25 - 40')).toBe(25);
    expect(minimumWeight(undefined)).toBeUndefined();
  });

  it('sorts from the lightest', () => {
    const sorted = filterByWeight([akita, beagle, mine], { weight: 'Lightest-first' });

    expect(sorted.map((d) => d.name)).toEqual(['Zippy', 'Beagle', 'akita']);
  });

  it('sorts from the heaviest', () => {
    const sorted = filterByWeight([mine, beagle, akita], { weight: 'Heaviest-first' });

    expect(sorted.map((d) => d.name)).toEqual(['akita', 'Beagle', 'Zippy']);
  });
});
