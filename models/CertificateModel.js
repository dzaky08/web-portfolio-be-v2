const Certificate = (sequelize, DataTypes) => {
  const CertificateModel = sequelize.define(
    "certificates",
    {
      front_img: {
        type: DataTypes.STRING,
      },
      back_img: {
        type: DataTypes.STRING,
      },
      name_cert: {
        type: DataTypes.STRING,
      },
      issuer: {
        type: DataTypes.STRING,
      },
      issue_date: {
        type: DataTypes.DATEONLY,
      },
      category: {
        type: DataTypes.ENUM(
          "cloud",
          "development",
          "dev_ops",
          "security",
          "data",
          "platform",
          "other"
        ),
      },
      credential_id: {
        type: DataTypes.STRING,
      },
      credential_url: {
        type: DataTypes.STRING,
      },
      //exp = expired
      exp_date: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return CertificateModel;
};

export default Certificate;
