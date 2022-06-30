'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('roles');

  }
};
