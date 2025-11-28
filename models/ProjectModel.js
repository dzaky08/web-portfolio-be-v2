const Project = (sequelize, DataTypes) => {
  const ProjectModel = sequelize.define(
    "projects",
    {
      title: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      project_desc: {
        type: DataTypes.TEXT,
      },
      client: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.DATEONLY,
      },
      end_date: {
        type: DataTypes.DATEONLY,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      old_slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      project_status: {
        type: DataTypes.ENUM("ongoing", "pending", "completed", "archived"),
      },
      live_url: {
        type: DataTypes.STRING,
      },
      repo_url: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );

  ProjectModel.associate = function (models) {
    ProjectModel.hasMany(models.Document, {
      foreignKey: "project_id",
      as: "documents",
    });
  };
  return ProjectModel;
};

export default Project;
