const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
     type: DataTypes.INTEGER,
     autoIncrement: true,
     allowNull: false,
     primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type : DataTypes.TEXT,
      allowNull : false
    },
    release_date: {
     type : DataTypes.DATEONLY
    },
    rating: {
      type : DataTypes.FLOAT
    },
    platforms: {
      type : DataTypes.TEXT,
      allowNull : false
    }
  }, {timestamps : false});
};
