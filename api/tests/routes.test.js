const request = require('supertest');

jest.mock('../src/db', () => ({
  Dog: { findAll: jest.fn(), create: jest.fn() },
  Temperament: { findAll: jest.fn(), bulkCreate: jest.fn() },
  conn: {},
}));
jest.mock('../src/services/dogApi', () => ({
  listBreeds: jest.fn(),
  searchBreeds: jest.fn(),
  getBreed: jest.fn(),
  listTemperaments: jest.fn(),
}));

const { Dog, Temperament } = require('../src/db');
const dogApi = require('../src/services/dogApi');
const app = require('../src/app');

beforeEach(() => jest.resetAllMocks());

describe('GET /dogs', () => {
  it('lists every breed', async () => {
    dogApi.listBreeds.mockResolvedValue([{ name: 'Akita' }]);

    const res = await request(app).get('/dogs');

    expect(res.body).toEqual([{ name: 'Akita' }]);
  });

  it('searches by name when asked to', async () => {
    dogApi.searchBreeds.mockResolvedValue([{ name: 'Beagle' }]);

    const res = await request(app).get('/dogs').query({ name: 'beagle' });

    expect(dogApi.searchBreeds).toHaveBeenCalledWith('beagle');
    expect(res.body).toEqual([{ name: 'Beagle' }]);
  });

  it('answers 502 when the external API fails', async () => {
    dogApi.listBreeds.mockRejectedValue(Object.assign(new Error('down'), { status: 502 }));

    const res = await request(app).get('/dogs');

    expect(res.status).toBe(502);
  });
});

describe('GET /dogs/:id', () => {
  it('returns the breed', async () => {
    dogApi.getBreed.mockResolvedValue({ id: 1, name: 'Akita' });

    const res = await request(app).get('/dogs/1');

    expect(dogApi.getBreed).toHaveBeenCalledWith('1');
    expect(res.body.name).toBe('Akita');
  });

  it('answers 404 for an unknown id', async () => {
    dogApi.getBreed.mockResolvedValue(null);

    const res = await request(app).get('/dogs/99');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('No match for the ID recieved');
  });
});

describe('GET /dogsDB', () => {
  it('lists the stored dogs', async () => {
    Dog.findAll.mockResolvedValue([{ id: 1, name: 'Mine' }]);

    const res = await request(app).get('/dogsDB');

    expect(res.body).toEqual([{ id: 1, name: 'Mine' }]);
  });
});

describe('GET /temperament', () => {
  it('serves the stored temperaments when there are some', async () => {
    Temperament.findAll.mockResolvedValue([{ name: 'Loyal' }]);

    const res = await request(app).get('/temperament');

    expect(res.body).toEqual([{ name: 'Loyal' }]);
    expect(dogApi.listTemperaments).not.toHaveBeenCalled();
  });

  it('loads them from the external API the first time', async () => {
    Temperament.findAll.mockResolvedValueOnce([]).mockResolvedValueOnce([{ name: 'Loyal' }]);
    dogApi.listTemperaments.mockResolvedValue(['Loyal']);

    const res = await request(app).get('/temperament');

    expect(Temperament.bulkCreate).toHaveBeenCalledWith([{ name: 'Loyal' }]);
    expect(res.body).toEqual([{ name: 'Loyal' }]);
  });
});

describe('POST /dog', () => {
  const dog = {
    name: 'Mine',
    minHeight: '40',
    maxHeight: '50',
    minWeight: '10',
    maxWeight: '15',
    life_span: '12 years',
    image: 'https://example.com/dog.png',
    temperament: 'Loyal',
  };

  it('stores the dog before answering', async () => {
    Dog.create.mockResolvedValue({});

    const res = await request(app).post('/dog').send(dog);

    expect(Dog.create).toHaveBeenCalledWith(dog);
    expect(res.status).toBe(200);
    expect(res.text).toBe('Dog generated successfully.');
  });

  it('answers 500 when the dog cannot be stored', async () => {
    Dog.create.mockRejectedValue(new Error('duplicate name'));

    const res = await request(app).post('/dog').send(dog);

    expect(res.status).toBe(500);
  });
});
