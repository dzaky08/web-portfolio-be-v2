'use strict';

/** @type {import('sequelize-cli').Migration} */
// File: YYYYMMDDHHMMSS-create-services-table.js
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('services', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: { type: Sequelize.STRING(255) },
    icon_url: { type: Sequelize.STRING(255) },
    service_desc: { type: Sequelize.TEXT },
    price_range: { type: Sequelize.STRING(255) },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('services');
}