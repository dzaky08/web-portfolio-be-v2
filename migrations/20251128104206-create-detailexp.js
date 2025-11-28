'use strict';

/** @type {import('sequelize-cli').Migration} */
// File: YYYYMMDDHHMMSS-create-expdetails-table.js
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('expdetails', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    // Foreign Key: exp_id
    exp_id: {
      type: Sequelize.INTEGER,
      references: { model: 'experiences', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    task_detail: { type: Sequelize.TEXT },
    sort_order: { type: Sequelize.INTEGER },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('expdetails');
}
