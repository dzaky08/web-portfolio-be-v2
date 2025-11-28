'use strict';

/** @type {import('sequelize-cli').Migration} */
// File: YYYYMMDDHHMMSS-create-blogs-table.js
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('blogs', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: { type: Sequelize.STRING(255) },
    content: { type: Sequelize.TEXT },
    tag: { type: Sequelize.STRING(255) },
    img_url: { type: Sequelize.STRING(255) },
    web_url: { type: Sequelize.STRING(255) },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('blogs');
}