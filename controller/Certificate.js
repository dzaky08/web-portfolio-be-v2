import models from "../models/index.js";

export const getCert = async (req, res) => {
  try {
    const certs = await models.Certificate.findAll();
    res.json(certs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error: Gagal mengambil data" });
  }
};

export const addCert = async (req, res) => {
  const {
    front_img,
    back_img,
    name_cert,
    issuer,
    issue_date,
    category,
    credential_id,
    credential_url,
    exp_date
  } = req.body;
  try {
    await models.Certificate.create({
      front_img,
      back_img,
      name_cert,
      issuer,
      issue_date,
      category,
      credential_id,
      credential_url,
      exp_date
    });
    res.status(201).json({ msg: "Data Berhasil ditambahkan" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error: Gagal mengambil data" });
  }
};

export const editCert = async (req, res) => {
  const certId = req.params.id;
  const certData = req.body;

  try {
    const [certUpdate] = await models.Certificate.update(
      {
        ...certData,
      },
      {
        where: {
          id: certId,
        },
      }
    );
    if (certUpdate === 0)
      return res.status(404).json({ msg: "data tidak ditemukan" });
    res.status(200).json({ msg: "Data berhasil diubah" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error: Gagal mengambil data" });
  }
};

export const deleteCert = async (req, res) => {
  const certId = req.params.id;
  try {
    const delCert = await models.Certificate.destroy({
      where: { id: certId },
    });
    if (!delCert) return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.status(200).json({ msg: "Data berhasil dihapus" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error: Gagal mengambil data" });
  }
};

export const getDetailCert = async (req, res) => {
  const certId = req.params.id;
  try {
    const certs = await models.Certificate.findOne({
      where: {
        id: certId,
      },
    });
    if (!certs) return res.status(404).json({ msg: "Certificate not found" });
    res.json(certs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error: Gagal mengambil detail certificate"});
  }
};
