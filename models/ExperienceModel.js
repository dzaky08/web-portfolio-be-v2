const Experience = (sequelize, DataTypes) => {
  const ExperienceModel = sequelize.define(
    "experiences",
    {
      company_name: {
        type: DataTypes.STRING,
      },
      job_title: {
        type: DataTypes.STRING,
      },
      job_type: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.DATEONLY,
      },
      end_date: {
        type: DataTypes.DATEONLY,
      },
      exp_status: {
        type: DataTypes.ENUM("in_progress", "finished"),
      },
      location: {
        type: DataTypes.STRING,
      },
      company_logo: {
        type: DataTypes.STRING,
      },
      exp_desc: {
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
    }
  );

  ExperienceModel.associate = function (models) {
    ExperienceModel.hasMany(models.ExpDetail, {
      foreignKey: "exp_id",
      as: "expdetail",
    });
  };
  return ExperienceModel;
};

export default Experience;
