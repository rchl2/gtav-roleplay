'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Doors', [{
        name: faker.company.companyName(),
        owner: 1,
        ownerType: 1,
        position: '{"x":370.6944580078125, "y":286.542724609375, "z":103.2823257446289}',
        heading: 90,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
      }], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Doors', null, {})
};
