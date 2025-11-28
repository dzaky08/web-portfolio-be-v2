'use strict';

/** @type {import('sequelize-cli').Migration} */
// File: YYYYMMDDHHMMSS-create-skills-table.js
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('skills', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name_skill: { type: Sequelize.STRING(255) },
    desc_skill: { type: Sequelize.TEXT },
    category: { type: Sequelize.ENUM('front_end', 'back_end', 'database', 'dev_ops', 'tools', 'security', 'other') },
    icon_url: { type: Sequelize.STRING(255) },
    proficiency: { type: Sequelize.ENUM('beginner', 'intermediate', 'advance') },
    exp_month: { type: Sequelize.INTEGER },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('skills');
}
