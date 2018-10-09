'use strict';

module.exports = (sequelize, DataTypes) => {
  let Character = sequelize.define('Character', {
    name: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    sex: DataTypes.INTEGER,
    money: DataTypes.INTEGER,
    position: DataTypes.TEXT,
    dimension: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
    lastVehicle: DataTypes.TEXT,
    lastExitType: DataTypes.STRING
  }, {});
  Character.associate = (models) => {
    // associations can be defined here
  };

  return Character;
};
