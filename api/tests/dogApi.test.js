jest.mock('node-fetch');

const fetch = require('node-fetch');
const dogApi = require('../src/services/dogApi');

const breed = {
  id: 1,
  name: 'Akita',
  temperament: 'Docile, Alert, Loyal',
  life_span: '10 - 14 years',
  weight: { metric: '25 - 40', imperial: '55 - 88' },
  height: { metric: '60 - 70', imperial: '24 - 28' },
  breed_group: 'Working',
  bred_for: 'Hunting',
  image: { id: 'img1' },
  reference_image_id: 'ref1',
};

const respondWith = (body, ok = true, status = 200) =>
  fetch.mockResolvedValue({ ok, status, json: async () => body });

beforeEach(() => jest.resetAllMocks());

describe('mappers', () => {
  it('summarizes a breed', () => {
    expect(dogApi.toSummary(breed, 'img1')).toEqual({
      id: 1,
      image: 'img1',
      name: 'Akita',
      temperament: 'Docile, Alert, Loyal',
      weight: '25 - 40',
      height: '60 - 70',
      lifeSpan: '10 - 14 years',
    });
  });

  it('drops the fields the detail view does not show', () => {
    const detail = dogApi.toDetail(breed);

    expect(detail.breed_group).toBeUndefined();
    expect(detail.bred_for).toBeUndefined();
    expect(detail.weight).toEqual({ metric: '25 - 40' });
    expect(detail.height).toEqual({ metric: '60 - 70' });
    expect(detail.name).toBe('Akita');
  });
});

describe('The Dog API requests', () => {
  it('lists breeds with the image id of each one', async () => {
    respondWith([breed]);

    const breeds = await dogApi.listBreeds();

    expect(fetch.mock.calls[0][0]).toContain('/breeds?api_key=');
    expect(breeds[0].image).toBe('img1');
  });

  it('searches breeds using the reference image', async () => {
    respondWith([breed]);

    const breeds = await dogApi.searchBreeds('aki ta');

    expect(fetch.mock.calls[0][0]).toContain('/breeds/search?q=aki%20ta&api_key=');
    expect(breeds[0].image).toBe('ref1');
  });

  it('finds a breed by id', async () => {
    respondWith([breed, { ...breed, id: 2, name: 'Beagle' }]);

    expect((await dogApi.getBreed('2')).name).toBe('Beagle');
  });

  it('returns null for an unknown id', async () => {
    respondWith([breed]);

    expect(await dogApi.getBreed('99')).toBeNull();
  });

  it('collects the unique temperaments', async () => {
    respondWith([
      breed,
      { ...breed, id: 2, temperament: 'Loyal, Playful' },
      { ...breed, id: 3, temperament: undefined },
    ]);

    expect(await dogApi.listTemperaments()).toEqual(['Docile', 'Alert', 'Loyal', 'Playful']);
  });

  it('fails with a 502 when the external API answers with an error', async () => {
    respondWith({}, false, 401);

    await expect(dogApi.listBreeds()).rejects.toMatchObject({ status: 502 });
  });
});
