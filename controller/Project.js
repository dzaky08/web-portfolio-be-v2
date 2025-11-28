import { Sequelize, where } from "sequelize";
import models from "../models/index.js";
import slugify from "slugify";

export const addProject = async (req, res) => {
  const {
    title,
    image,
    project_desc,
    client,
    start_date,
    end_date,
    project_status,
    live_url,
    repo_url,
  } = req.body;

  const projectSlug = slugify(title, {
    lower: true, // Mengubah semua menjadi huruf kecil
    strict: true, // Menghapus karakter yang tidak perlu
  });

  const checkSlug = await models.Project.findOne({
    where: { slug: projectSlug },
  });
  if (checkSlug)
    return res
      .status(409)
      .json({ msg: "slug sudah terdaftar, silahkan ubah judul" });

  try {
    await models.Project.create({
      title,
      image, //jika variabel beda dengan field tabel database maka ketik contoh image: img
      project_desc,
      client,
      start_date,
      end_date,
      slug: projectSlug,
      project_status,
      live_url,
      repo_url,
    });
    res.status(201).json({ msg: "berhasil menambahkan project" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Gagal menambahkan project karena kesalahan server.",
      error: error.message,
    });
  }
};

export const getProject = async (req, res) => {
  try {
    const projects = await models.Project.findAll();
    res.json(projects);
  } catch (error) {
    console.log(error);
  }
};

export const editProject = async (req, res) => {
  const projectId = req.params.id;
  console.log(projectId);
  const projectData = req.body;

  try {
    const existingProject = await models.Project.findByPk(projectId);

    if (!existingProject)
      return res.status(404).json({ msg: "Project tidak ditemukan" });

    let finalSlug = existingProject.slug;
    let oldSlugToStore = null; //variabel untuk menyimpan slug lama jika slug diubah
    //cek apakah title diubah
    if (projectData.title && projectData.title !== existingProject.title) {
      const newSlug = slugify(projectData.title, {
        lower: true,
        strict: true,
      });
      //cek new slug apakah sudah terdaftar
      const checkSlug = await models.Project.findOne({
        where: {
          slug: newSlug,
          id: { [Sequelize.Op.not]: projectId },
        },
      });

      if (checkSlug)
        return res
          .status(409)
          .json({ msg: "slug sudah terdaftar, silahkan mengubah judul" });

      //logika old slug, dimana jika kita mengubah title atau ubah slug(otomatis dari title)
      //maka slug yang lama akan disimpan di oldslug
      oldSlugToStore = existingProject.slug;

      //kita gunakan slug yang baru di finalslug
      finalSlug = newSlug;
    }

    const [updateRowsCount] = await models.Project.update(
      {
        ...projectData,
        slug: finalSlug,
        old_slug: oldSlugToStore,
      },
      {
        where: {
          id: projectId,
        },
      }
    );

    if (updateRowsCount === 0)
      return res.status(404).json({ msg: "project tidak ditemukan" });
    res.status(200).json({ msg: "project berhasil diperbarui" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Gagal mengubah project karena kesalahan server.",
      error: error.message,
    });
  }
};

export const getProjectBySlug = async (req, res) => {
  const reqSlug = req.params.slug;

  const project = await models.Project.findOne({
    where: {
      slug: reqSlug,
    },
  });

  //jika tidak ditemukan kita cari di kolom oldslug
  if (!project) {
    project = await models.Project.findOne({ where: { old_slug: reqSlug } });
    if (project) {
      return res.status(301).redirect("get-project/${project.slug}");
    }
  }
  //jika ditemukan si slug aktif atau sudah redirect ke oldslug maka kita kirim data
  if (project) return res.status(200).json(project);
  //jika tidak ditemukan maka kita kirim pesan
  return res.status(404).json({ msg: "Project tidak ditemukan" });
};

export const deleteProject = async (req, res) => {
  const projectId = req.params.id;
  console.log(projectId);

  try {
    const deleteProject = await models.Project.destroy({
      where: { id: projectId },
    });
    if (deleteProject === 0)
      return res.status(404).json({ msg: "Project tidak ditemukan" });
    return res.status(200).json({ msg: "project berhasil dihapus" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Gagal menghapus project karena kesalahan server.",
      error: error.message,
    });
  }
};

export const getDetailProject = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const projectData = await models.Project.findOne({
      where: {
        id: projectId,
      },
      include: [
        {
          model: models.Document,
          as: 'documents'
        },
      ],
    });
    if (!projectData) {
      return res.status(404).json({ msg: "Document tidak ditemukan" });
    }
    res.json(projectData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
