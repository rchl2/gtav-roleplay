'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Doors', {
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
      type: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      owner: {
        type: Sequelize.INTEGER
      },
      ownerType: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      insidePosition: {
        type: Sequelize.TEXT
      },
      heading: {
        type: Sequelize.FLOAT
      },
      dimension: {
        type: Sequelize.INTEGER
      },
      insideDimension: {
        type: Sequelize.INTEGER
      },
      marker: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      enterPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      blip: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      blipSprite: {
        type: Sequelize.INTEGER,
        defaultValue: 66
      },
      blipColor: {
        type: Sequelize.INTEGER,
        defaultValue: 4
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Doors');
  }
};
