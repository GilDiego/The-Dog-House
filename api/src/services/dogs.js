const { Dog, Temperament } = require('../db');

const createStored = (fields) => {
  const { name, minHeight, maxHeight, minWeight, maxWeight, life_span, image, temperament } =
    fields;

  return Dog.create({
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    life_span,
    image,
    temperament,
  });
};

const syncTemperaments = async (names) => {
  await Temperament.bulkCreate(names.map((name) => ({ name })));
  return Temperament.findAll({ attributes: ['name'] });
};

module.exports = { createStored, syncTemperaments };
