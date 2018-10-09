'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      model: {
        type: Sequelize.STRING
      },
      fuel: {
        type: Sequelize.FLOAT,
        defaultValue: '10.0'
      },
      fuelType: {
        type: Sequelize.INTEGER
      },
      fuelRatio: {
        type: Sequelize.FLOAT
      },
      tankCapacity: {
        type: Sequelize.FLOAT,
        defaultValue: '20.0'
      },
      owner: {
        type: Sequelize.INTEGER
      },
      primaryColor: {
        type: Sequelize.STRING
      },
      secondaryColor: {
        type: Sequelize.STRING
      },
      plate: {
        type: Sequelize.STRING(8),
        defaultValue: null
      },
      plateType: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      dirtLevel: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      position: {
        type: Sequelize.TEXT
      },
      dimension: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Vehicles')
};
