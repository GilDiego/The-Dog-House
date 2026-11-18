const parseTemperaments = (temperament) =>
  temperament
    .toString()
    .split(',')
    .map((word) => word.trim());

export function filterByTemperament(dogs, options) {
  if (!dogs.length || options.temperament === 'All') return dogs;

  return dogs.filter(
    (dog) => dog.temperament && parseTemperaments(dog.temperament).includes(options.temperament)
  );
}

export function filterAlphabetically(dogs, options) {
  const byName = (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase());

  if (options.order === 'asc') return [...dogs].sort(byName);
  if (options.order === 'desc') return [...dogs].sort((a, b) => byName(b, a));
  return dogs;
}

export function minimumWeight(weight) {
  return typeof weight === 'string' ? Number(weight.split('-')[0].trim()) : undefined;
}

export function filterByWeight(dogs, options) {
  const byWeight = (a, b) => minimumWeight(a.weight) - minimumWeight(b.weight);

  if (options.weight === 'Lightest-first') return [...dogs].sort(byWeight);
  if (options.weight === 'Heaviest-first') return [...dogs].sort((a, b) => byWeight(b, a));
  return dogs;
}

export function filterAPI(dogs, sources, apiDogs) {
  if (sources.API === false) return dogs.filter((dog) => !apiDogs.includes(dog));
  return dogs;
}

export function filterAPISearch(dogs, sources, storedDogs) {
  if (sources.API === false) return dogs.filter((dog) => storedDogs.includes(dog));
  return dogs;
}

export function filterDB(dogs, sources, storedDogs) {
  if (sources.DB === false) return dogs.filter((dog) => !storedDogs.includes(dog));
  return dogs;
}
