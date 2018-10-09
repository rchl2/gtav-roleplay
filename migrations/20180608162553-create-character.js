'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Characters', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      owner: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sex: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      money: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      position: {
        type: Sequelize.TEXT
      },
      dimension: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      lastLogin: {
        allowNull: false,
        type: Sequelize.DATE
      },
      lastVehicle: {
        type: Sequelize.TEXT
      },
      lastExitType: {
        allowNull: true,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Characters')
};
