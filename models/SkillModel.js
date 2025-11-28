import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const Skill = (sequelize, DataTypes) => {
  const SkillModel = sequelize.define(
    "skills",
    {
      name_skill: {
        type: DataTypes.STRING,
      },
      desc_skill: {
        type: DataTypes.TEXT,
      },
      category: {
        type: DataTypes.ENUM(
          "front_end",
          "back_end",
          "database",
          "dev_ops",
          "tools",
          "security",
          "other"
        ),
      },
      icon_url: {
        type: DataTypes.STRING,
      },
      proficiency: {
        type: DataTypes.ENUM("beginner", "intermediate", "advance"),
      },
      //exp = experience
      exp_month: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return SkillModel;
};

export default Skill;
