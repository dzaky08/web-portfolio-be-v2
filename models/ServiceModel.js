const Service = (sequelize, DataTypes) => {
  const ServiceModel = sequelize.define(
    "services",
    {
      title: {
        type: DataTypes.STRING,
      },
      icon_name: {
        type: DataTypes.TEXT,
      },
      service_desc: {
        type: DataTypes.STRING,
      },
      price_range: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return ServiceModel;
};

export default Service;
