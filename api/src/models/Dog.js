const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minHeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxHeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.VIRTUAL,
        get() {
          return `${this.minHeight} - ${this.maxHeight} meters`;
        },
    },
    minWeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxWeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.VIRTUAL,
        get() {
          return `${this.minWeight} - ${this.maxWeight} kilograms`;
        },
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
