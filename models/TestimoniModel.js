import { DataTypes, Sequelize } from "sequelize";

const Testimoni = (sequelize, DataTypes) => {
  const TestimoniModel = sequelize.define(
    "testimonis",
    {
      quote: {
        type: DataTypes.STRING,
      },
      client_name: {
        type: DataTypes.TEXT,
      },
      client_title: {
        type: DataTypes.STRING,
      },
      img_url: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return TestimoniModel;
};
export default Testimoni;
