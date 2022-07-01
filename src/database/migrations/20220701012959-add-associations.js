'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn(
      'users', // name of Source model
      'rolesId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'SET NULL',
      }
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'users', // name of Source model
      'rolesId' // key we want to remove
    )
  }
};
