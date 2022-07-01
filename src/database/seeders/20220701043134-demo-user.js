'use strict';

const bcrypt = require('bcrypt');
const { faker } = require ('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {

    var listUser = [];
    
    for (var i = 0; i < 25; i++) {
      listUser.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: 21,
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        avatar: faker.image.avatar(),
        birthday: faker.date.birthdate(),
        gender: 'Male',
        rolesId: '3',
        password: bcrypt.hashSync(faker.internet.password(), 8),
        address: faker.address.city()
      });
    }

    await queryInterface.bulkInsert('users', listUser, {});
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  }
};
