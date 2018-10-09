'use strict';

module.exports = (sequelize, DataTypes) => {
  let Door = sequelize.define('Door', {
    name: DataTypes.STRING,
    type: DataTypes.INTEGER,
    owner: DataTypes.INTEGER,
    ownerType: DataTypes.INTEGER,
    position: DataTypes.TEXT,
    insidePosition: DataTypes.TEXT,
    heading: DataTypes.FLOAT,
    dimension: DataTypes.INTEGER,
    insideDimension: DataTypes.INTEGER,
    marker: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    enterPrice: DataTypes.INTEGER,
    blip: DataTypes.BOOLEAN,
    blipSprite: DataTypes.INTEGER,
    blipColor: DataTypes.INTEGER
  }, {});
  Door.associate = (models) => {
    // associations can be defined here
  };
  return Door;
};
