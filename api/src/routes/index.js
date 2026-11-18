const { Router } = require('express');
const dogApi = require('../services/dogApi');
const store = require('../services/dogs');
const { Dog, Temperament } = require('../db');

const router = Router();

const handle = (action) => (req, res, next) => action(req, res).catch(next);

router.get(
  '/dogs',
  handle(async (req, res) => {
    const { name } = req.query;
    res.json(name ? await dogApi.searchBreeds(name) : await dogApi.listBreeds());
  })
);

router.get(
  '/dogs/:id',
  handle(async (req, res) => {
    const breed = await dogApi.getBreed(req.params.id);

    if (!breed) return res.status(404).json({ error: 'No match for the ID recieved' });

    res.json(breed);
  })
);

router.get(
  '/dogsDB',
  handle(async (req, res) => {
    res.json(await Dog.findAll());
  })
);

router.get(
  '/temperament',
  handle(async (req, res) => {
    const temperaments = await Temperament.findAll({ attributes: ['name'] });

    if (temperaments.length) return res.json(temperaments);

    res.json(await store.syncTemperaments(await dogApi.listTemperaments()));
  })
);

router.post(
  '/dog',
  handle(async (req, res) => {
    await store.createStored(req.body);
    res.status(200).send('Dog generated successfully.');
  })
);

module.exports = router;
