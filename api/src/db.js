const { Sequelize } = require('sequelize');
const defineDog = require('./models/Dog');
const defineTemperament = require('./models/Temperament');
const { databaseUrl } = require('./config');

const sequelize = new Sequelize(databaseUrl, { logging: false });

const Dog = defineDog(sequelize);
const Temperament = defineTemperament(sequelize);

Dog.belongsToMany(Temperament, { through: 'dog_temperament' });
Temperament.belongsToMany(Dog, { through: 'dog_temperament' });

module.exports = { Dog, Temperament, conn: sequelize };
