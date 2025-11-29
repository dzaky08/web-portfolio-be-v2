import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "../config/Database.js";
import router from "../routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000; // <--- DEFINISI PORT

try {
  await db.authenticate();
  console.log("Database connected"); // await db.sync();
  // --- BARIS WAJIB UNTUK MENJALANKAN SERVER ---
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  // ----------------------------------------------
  app.get("/", (req, res) => {
    res
      .status(200)
      .json({ message: "Welcome to Portfolio API v2. Server is healthy." });
  });
} catch (error) {
  console.error("Error saat koneksi atau menjalankan server:", error);
  process.exit(1); // Hentikan proses jika gagal
}

app.use(cookieParser());
app.use(express.json());
app.use("/", router);