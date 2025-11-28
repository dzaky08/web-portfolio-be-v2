'use strict';

/** @type {import('sequelize-cli').Migration} */
// File: YYYYMMDDHHMMSS-create-projects-table.js
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('projects', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: { type: Sequelize.STRING(255) },
    image: { type: Sequelize.STRING(255) },
    project_desc: { type: Sequelize.TEXT },
    client: { type: Sequelize.STRING(255) },
    start_date: { type: Sequelize.DATE },
    end_date: { type: Sequelize.DATE },
    slug: { type: Sequelize.STRING(255), unique: true }, // Biasanya slug dibuat unik
    old_slug: { type: Sequelize.STRING(255) },
    project_status: { type: Sequelize.ENUM('ongoing', 'pending', 'completed', 'archived') },
    live_url: { type: Sequelize.STRING(255) },
    repo_url: { type: Sequelize.STRING(255) },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('projects');
}