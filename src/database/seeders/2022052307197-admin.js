import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config('');

('use strict');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('users', [
      {
        id: '1',
        firstName: 'felix Ange',
        lastName: 'Izere',
        email: 'izerefaifelix@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
