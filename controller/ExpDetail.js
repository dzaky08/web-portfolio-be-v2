import models from "../models/index.js";

export const getExpDetail = async (req, res) => {
  const expDetailId = req.params.expDetailId;
  const expDetailData = await models.ExpDetail.findOne({
    where: {
      id: expDetailId,
    },
  });
  if (expDetailData.length === 0) return res.status(404).json("data tidak ditemukan");
  res.json(expDetailData);
};

export const addExpDetail = async (req, res) => {
  const expId = req.params.expId;
  const { task_detail, sort_order } = req.body;
  try {
    await models.ExpDetail.create({
      exp_id: expId,
      task_detail,
      sort_order,
      
    });
    return res.status(201).json({ msg: "Berhasil menambah data" });
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
export const editExpDetail = async (req, res) => {
  const expDetailId = req.params.expDetailId;
  const expDetailData = req.body;
  try {
    const [updateExpDetail] = await models.ExpDetail.update(
      {
        ...expDetailData,
      },
      {
        where: {
          id: expDetailId,
        },
      }
    );
    if (!updateExpDetail === 0)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.status(200).json({ msg: " data berhasil diubah" });
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

export const deleteExpDetail = async (req, res) => {
  const expDetailId = req.params.expDetailId;
  try {
    const delExpDetail = await models.ExpDetail.destroy({
      where: {
        id: expDetailId,
      },
    });
    if (delExpDetail === 0)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    return res.status(200).json({ msg: "Data berhasil dihapus" });
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
