import models from "../models/index.js";

export const getDocument = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const docs = await models.Document.findAll({
      where: {
        project_id: projectId,
      },
    });

    if (docs.length === 0)
      return res.status(404).json({ msg: "Document not found" });
    res.json(docs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error", error: error.msg });
  }
};

export const addDocument = async (req, res) => {
  const projectId = req.params.projectId;
  const { doc_name, doc_type, doc_url } = req.body;
  try {
    await models.Document.create({
      project_id: projectId,
      doc_name,
      doc_type,
      doc_url,
    });
    res.status(201).json({ msg: "Success add new document" });
  } catch (error) {
    console.error(error);
    // Cek apakah error dari validasi Sequelize
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({ msg: error.message }); // 400 Bad Request
    }
    res.status(500).json({ msg: "server error", error: error.msg });
  }
};

export const editDocument = async (req, res) => {
  const docId = req.params.docId;
  const docData = req.body;
  try {
    const [docUpdate] = await models.Document.update(
      {
        ...docData,
      },
      {
        where: {
          id: docId,
        },
      }
    );
    if (docUpdate === 0) res.status(404).json({ msg: "Data tidak ditemukan" });
    res.status(200).json({ msg: "Document berhasil diubah" });
  } catch (error) {
    console.error(error);
    // Menambahkan penanganan error validasi (misalnya: doc_type salah)
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).json({ msg: "server error", error: error.msg });
  }
};

export const deleteDoc = async (req, res) => {
  const docId = req.params.docId;
  try {
    const delDoc = await models.Document.destroy({ where: { id: docId } });
    if (delDoc === 0) {
      return res.status(404).json({ msg: "Document tidak ditemukan" });
    }
    return res.status(200).json({ msg: "Document berhasil dihapus" });
  } catch (error) {
    console.error(error);
    // Menambahkan penanganan error validasi (misalnya: doc_type salah)
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).json({ msg: "server error", error: error.msg });
  }
};
export const getDocDetail = async (req, res) => {
  const docId = req.params.docId;
  try {
    const docs = await models.Document.findOne({
      where: {
        id: docId,
      },
    });
    if (!docs) return res.status(404).json({ msg: "Document not found" });
    res.json(docs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error", error: error.msg });
  }
};
