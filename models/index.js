import { Sequelize } from "sequelize";
//Asumsi db adalah koneksi Sequelize yang sudah di inisialisasi
import db from "../config/Database.js";
const {DataTypes} = Sequelize;

// --- 1. IMPORT SEMUA FUNGSI MODEL ---
// Walaupun 'Users' dan 'Documents' di-import dengan nama jamak di controller,
// sebaiknya gunakan nama yang jelas di sini (misalnya ProjectModel, DocumentModel)
import UserModel from "./UserModel.js";
import ProjectModel from "./ProjectModel.js";
import DocumentModel from "./DocumentModel.js";
import ExperienceModel from "./ExperienceModel.js";
import ExpDetailModel from "./ExpDetailModel.js";
import SkillModel from "./SkillModel.js";
import CertificateModel from "./CertificateModel.js";
import TestimoniModel from "./TestimoniModel.js";
import ServiceModel from "./ServiceModel.js";
import BlogModel from "./BlogModel.js";


const models = {}; // Objek utama untuk menyimpan instance model yang siap pakai

// --- 2. PANGGIL SEMUA FUNGSI MODEL DAN INJEKSI KONEKSI ---
// Kunci (key) di objek 'models' ini yang akan dipakai di seluruh aplikasi (misal: models.Project)
// Nama kunci disarankan TUNGGAL (Project, Document, Service)
models.User = UserModel(db, DataTypes);
models.Project = ProjectModel(db, DataTypes);
models.Document = DocumentModel(db, DataTypes);
models.Experience = ExperienceModel(db, DataTypes);
models.ExpDetail = ExpDetailModel(db, DataTypes);
models.Skill = SkillModel(db, DataTypes);
models.Certificate = CertificateModel(db, DataTypes);
models.Testimoni = TestimoniModel(db, DataTypes);
models.Service = ServiceModel(db, DataTypes);
models.Blog = BlogModel(db, DataTypes);

console.log(models);

// --- 3. MENJALANKAN FUNGSI ASOSIASI (.associate) ---
// Perulangan ini akan mencari dan menjalankan fungsi associate di setiap model
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    // Fungsi associate dipanggil dan dilewati objek 'models' lengkap
    models[modelName].associate(models);
  }
});

// --- 4. EXPORT OBJEK LENGKAP ---
models.sequelize = db;  // Menyimpan instance koneksi DB
models.Sequelize = Sequelize; // Menyimpan instance Sequelize

export default models;