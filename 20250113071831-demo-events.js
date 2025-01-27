'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Events', [
      {
        name: 'Soccer Tournament',
        date: new Date(),
        location: 'Stadium A',
        teams: JSON.stringify(['Team A', 'Team B']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Events', { name: 'Soccer Tournament' }, {});
  },
};
