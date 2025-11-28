'use strict';

/** @type {import('sequelize-cli').Migration} */// File: YYYYMMDDHHMMSS-create-documents-table.js
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('documents', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    // Foreign Key: project_id
    project_id: {
      type: Sequelize.INTEGER,
      references: { model: 'projects', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    doc_name: { type: Sequelize.STRING(255) },
    doc_type: { type: Sequelize.ENUM('proposal_awal', 'mockup', 'ppt', 'laporan_akhir') },
    doc_url: { type: Sequelize.STRING(255) },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('documents');
}