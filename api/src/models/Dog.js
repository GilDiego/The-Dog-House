const { DataTypes } = require('sequelize');

const required = { type: DataTypes.STRING, allowNull: false };

module.exports = (sequelize) =>
  sequelize.define('dog', {
    idDB: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.id}DB`;
      },
    },
    name: { ...required, unique: true },
    minHeight: required,
    maxHeight: required,
    height: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.minHeight} - ${this.maxHeight}`;
      },
    },
    minWeight: required,
    maxWeight: required,
    weight: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.minWeight} - ${this.maxWeight}`;
      },
    },
    life_span: required,
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    temperament: required,
  });
