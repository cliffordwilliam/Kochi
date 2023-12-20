"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Chat_Rooms", [
      { name: "0", createdAt: new Date(), updatedAt: new Date() },
      { name: "1", createdAt: new Date(), updatedAt: new Date() },
      { name: "2", createdAt: new Date(), updatedAt: new Date() },
      { name: "3", createdAt: new Date(), updatedAt: new Date() },
      { name: "4", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Chat_Rooms", null, {});
  },
};
