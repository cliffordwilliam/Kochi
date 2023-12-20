"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Chats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" }, // fk
        onUpdate: "cascade", // fk
        onDelete: "cascade", // fk
        allowNull: false, // required
      },
      chat_room_id: {
        type: Sequelize.INTEGER,
        references: { model: "Chat_Rooms", key: "id" }, // fk
        onUpdate: "cascade", // fk
        onDelete: "cascade", // fk
        allowNull: false, // required
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false, // required
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Chats");
  },
};
