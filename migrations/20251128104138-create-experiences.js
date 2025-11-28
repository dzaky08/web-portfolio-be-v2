'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('experiences', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    company_name: { type: Sequelize.STRING(255) },
    job_title: { type: Sequelize.STRING(255) },
    job_type: { type: Sequelize.STRING(255) },
    start_date: { type: Sequelize.DATE },
    end_date: { type: Sequelize.DATE },
    exp_status: { type: Sequelize.ENUM('in_progress', 'finished') },
    location: { type: Sequelize.STRING(255) },
    company_logo: { type: Sequelize.STRING(255) },
    exp_desc: { type: Sequelize.TEXT },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('experiences');
}
