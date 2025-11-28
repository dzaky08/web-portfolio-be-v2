'use strict';

/** @type {import('sequelize-cli').Migration} */// File: YYYYMMDDHHMMSS-create-users-table.js
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: Sequelize.STRING(255), allowNull: false },
    email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
    password: { type: Sequelize.STRING(255), allowNull: false },
    role: { type: Sequelize.STRING(255) },
    refresh_token: { type: Sequelize.TEXT },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('users');
}
