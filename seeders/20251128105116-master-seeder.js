'use strict';
import { hash } from 'bcrypt';

export async function up(queryInterface, Sequelize) {
  const saltRounds = 10;
  const hashedPassword = await hash('adminabdul1234', saltRounds);

  // --- 1. Users Data ---
  await queryInterface.bulkInsert('users', [{
    name: 'Admin Abdul',
    email: 'abdul1@gmail.com',
    password: hashedPassword,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
}
export async function down(queryInterface, Sequelize) {
  // Jalankan penghapusan data secara terbalik
  await queryInterface.bulkDelete('projects', null, {});
  await queryInterface.bulkDelete('skills', null, {});
  await queryInterface.bulkDelete('users', null, {});
}