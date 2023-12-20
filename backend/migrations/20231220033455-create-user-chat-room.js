"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User_Chat_Rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // required
        unique: true, // unique
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false, // required
        references: { model: "Users", key: "id" }, // fk
        onUpdate: "cascade", // fk
        onDelete: "cascade", // fk
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
    await queryInterface.dropTable("User_Chat_Rooms");
  },
};
