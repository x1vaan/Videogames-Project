const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Description', {
     description: {
        type: DataTypes.TEXT,
        allowNull : false
     },
     idapi : {
      type : DataTypes.STRING,
     }
  });
}