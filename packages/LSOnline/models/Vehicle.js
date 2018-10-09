'use strict';

module.exports = (sequelize, DataTypes) => {
  let Vehicle = sequelize.define('Vehicle', {
    name: DataTypes.STRING,
    model: DataTypes.STRING,
    fuel: DataTypes.FLOAT,
    fuelType: DataTypes.INTEGER,
    fuelRatio: DataTypes.FLOAT,
    tankCapacity: DataTypes.FLOAT,
    owner: DataTypes.INTEGER,
    ownerType: DataTypes.INTEGER,
    primaryColor: DataTypes.STRING,
    secondaryColor: DataTypes.STRING,
    plate: DataTypes.STRING,
    plateType: DataTypes.INTEGER,
    dirtLevel: DataTypes.FLOAT,
    position: DataTypes.TEXT,
    dimension: DataTypes.STRING
  }, {});
  Vehicle.associate = (models) => {
    // associations can be defined here
  };
  return Vehicle;
};
