'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      birthday: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // roleId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
        
      // },
    });

  },

  async down(queryInterface, Sequelize) {

    return await queryInterface.dropTable('users');

  }
};
