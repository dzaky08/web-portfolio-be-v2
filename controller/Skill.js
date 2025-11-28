import models from "../models/index.js";

export const getSkill = async (req, res) => {
  const skill = await models.Skill.findAll();
  res.json(skill);
};

export const addSkill = async (req, res) => {
  const { name_skill, desc_skill, category, icon_url, proficiency, exp_month } =
    req.body;
  try {
    await models.Skill.create({
      name_skill,
      desc_skill,
      category,
      icon_url,
      proficiency,
      exp_month,
    });
    res.status(201).json({ msg: "Berhasil menambah skill baru" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error: Gagal mengambil data" });
  }
};

export const editSkill = async (req, res) => {
  const skillId = req.params.id;
  const skillData = req.body;

  try {
    const [skillUpdate] = await models.Skill.update(
      {
        ...skillData,
      },
      {
        where: {
          id: skillId,
        },
      }
    );

    if (skillUpdate === 0)
      return res.status(404).json({ msg: "Skill tidak ditemukan" });
    res.status(200).json({ msg: "Skill berhasil diubah" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error: Gagal mengambil data" });
  }
};

export const deleteSkill = async (req, res) => {
  const skillId = req.params.id;
  try {
    const delSkill = await models.Skill.destroy({
      where: { id: skillId },
    });
    if (!delSkill)
      return res.status(404).json({ msg: "Skill tidak ditemukan" });
    res.status(200).json({ msg: "Skill berhasil dihapus" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error: Gagal mengambil data" });
  }
};

export const getDetailSkill = async (req, res) => {
  const skillId = req.params.id;
  try {
    const skills = await models.Skill.findOne({
      where: {
        id: skillId,
      },
    });
    if (!skills) return res.status(404).json({ msg: "Skill not found" });
    res.json(skills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error: Gagal mengambil detail skill" });
  }
};
