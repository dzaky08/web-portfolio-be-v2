'use strict';

/** @type {import('sequelize-cli').Migration} */
// File: YYYYMMDDHHMMSS-create-certificates-table.js
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('certificates', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    front_img: { type: Sequelize.STRING(255) },
    back_img: { type: STRING(255) },
    name_cert: { type: Sequelize.STRING(255) },
    issuer_date: { type: Sequelize.DATE },
    issue_date: { type: Sequelize.DATE },
    category: { type: Sequelize.ENUM('cloud', 'development', 'devops', 'security', 'data', 'platform', 'other') },
    credential_id: { type: Sequelize.STRING(255) },
    credential_url: { type: Sequelize.STRING(255) },
    exp_date: { type: Sequelize.DATE },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('certificates');
}