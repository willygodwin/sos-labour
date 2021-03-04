'use strict';

var bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [{
     
      email: "will@gmail.com",
      password: bcrypt.hashSync("will", bcrypt.genSaltSync(10), null),
      user_type: "labourer"
      },
      {
      email: "naresh@gmail.com",
      password: bcrypt.hashSync("naresh", bcrypt.genSaltSync(10), null),
      user_type: "labourer"
      },
      {
        email: "vince@gmail.com",
        password: bcrypt.hashSync("vince", bcrypt.genSaltSync(10), null),
        user_type: "labourer"
      },
    
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
