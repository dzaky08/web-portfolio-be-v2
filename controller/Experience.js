import models from "../models/index.js";

export const getExp = async (req, res) => {
  const expData = await models.Experience.findAll();
  return res.json(expData);
};

export const addExp = async (req, res) => {
  const {
    company_name,
    job_title,
    job_type,
    start_date,
    end_date,
    exp_status,
    location,
    company_logo,
    exp_desc,
  } = req.body;
  try {
    await models.Experience.create({
      company_name,
      job_title,
      job_type,
      start_date,
      end_date,
      exp_status,
      location,
      company_logo,
      exp_desc,
    });
    res.status(200).json({ msg: " berhasil menambahkan experience" });
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

export const editExp = async (req, res) => {
  const expId = req.params.id;
  const expData = req.body;
  try {
    const [expUpdate] = await models.Experience.update(
      {
        ...expData,
      },
      {
        where: { id: expId },
      }
    );
    if (expUpdate === 0)
      return res.status(404).json({ msg: "data tidak ditemukan" });
    res.status(200).json({ msg: " data berhasil diubah" });
  } catch (error) {
    console.error(error);
    // Cek apakah error dari validasi Sequelize
    res.status(500).json({ msg: "server error", error: error.msg });
  }
};

export const deleteExp = async (req, res) => {
  const expId = req.params.id;
  try {
    const delExp = await models.Experience.destroy({
      where: { id: expId },
    });
    if (delExp === 0)
      return res.status(404).json({ msg: "data tidak ditemukan" });
    return res.json({ msg: " data berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error", error: error.msg });
  }
};

export const expDetail = async (req, res) => {
  const expId = req.params.expId;
  try {
    const expData = await models.Experience.findAll({
      where: { id: expId },

      include: [
        {
          model: models.ExpDetail,
          as: "expdetail",
        },
      ],
    });
    console.log(expData);
    if (!expData) res.status(404).json({ msg: "data tidak ditemukan" });
    res.json(expData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error", error: error.msg });
  }
};
