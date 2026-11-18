const fetch = require('node-fetch');
const { dogApiKey } = require('../config');

const BASE_URL = 'https://api.thedogapi.com/v1';

const toSummary = (dog, image) => ({
  id: dog.id,
  image,
  name: dog.name,
  temperament: dog.temperament,
  weight: dog.weight.metric,
  height: dog.height.metric,
  lifeSpan: dog.life_span,
});

const toDetail = ({ breed_group, bred_for, weight, height, ...dog }) => ({
  ...dog,
  weight: { metric: weight.metric },
  height: { metric: height.metric },
});

const request = async (path) => {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${BASE_URL}${path}${separator}api_key=${dogApiKey}`);

  if (!response.ok) {
    const error = new Error(`The Dog API responded with status ${response.status}`);
    error.status = 502;
    throw error;
  }

  return response.json();
};

const listBreeds = async () => {
  const breeds = await request('/breeds');
  return breeds.map((dog) => toSummary(dog, dog.image && dog.image.id));
};

const searchBreeds = async (name) => {
  const breeds = await request(`/breeds/search?q=${encodeURIComponent(name)}`);
  return breeds.map((dog) => toSummary(dog, dog.reference_image_id));
};

const getBreed = async (id) => {
  const breeds = await request('/breeds');
  const breed = breeds.find((dog) => String(dog.id) === String(id));
  return breed ? toDetail(breed) : null;
};

const listTemperaments = async () => {
  const breeds = await request('/breeds');
  const names = breeds
    .flatMap((dog) => (dog.temperament || '').split(','))
    .map((name) => name.trim())
    .filter(Boolean);

  return [...new Set(names)];
};

module.exports = { toSummary, toDetail, listBreeds, searchBreeds, getBreed, listTemperaments };
