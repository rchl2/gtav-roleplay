'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Characters', [{
      name: faker.name.findName(),
      owner: 1,
      age: faker.random.number(),
      sex: 1,
      money: faker.random.number(),
      dimension: 0,
      lastLogin: faker.date.past(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    }], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Characters', null, {})
};
