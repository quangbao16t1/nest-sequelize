'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('bookings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      tableId: {
        type: Sequelize.STRING,
      },
      startTime: {
        type: Sequelize.TIME,
      },
      endTime: {
        type: Sequelize.TIME,
      },
      date: {
        type: Sequelize.DATE,
      },
      name: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('bookings');
  }
};
