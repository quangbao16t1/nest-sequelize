'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'users',
      'roleId'
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'roleId'
    )
  }
};
