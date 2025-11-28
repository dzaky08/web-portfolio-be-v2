// File: api/config/db.js (atau tempat Anda menyimpannya)

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Gunakan DATABASE_URL penuh dari .env
const connectionString = process.env.DATABASE_URL; 

if (!connectionString) {
  throw new Error("DATABASE_URL tidak terdefinisi di .env");
}

const db = new Sequelize(connectionString, { // Hanya satu argumen: connectionString
    // Karena kita menggunakan URI, parameter DB_USER, DB_NAME, dkk. tidak perlu lagi
    
    dialect: 'postgres',
    // --- Pengaturan Pool untuk Vercel Serverless ---
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    // --- Pengaturan Wajib untuk Supabase (SSL) ---
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    // Log query hanya di development
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

export default db;