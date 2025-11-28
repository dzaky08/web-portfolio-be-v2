const ExpDetail = (sequelize, DataTypes) => {
  const ExpDetailModel = sequelize.define(
    "expdetails",
    {
      exp_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "experiences",
          key: "id",
        },
      },
      task_detail: {
        type: DataTypes.TEXT,
      },
      sort_order: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
    }
  );

  ExpDetailModel.associate = function (models) {
    ExpDetailModel.belongsTo(models.Experience, {
      foreignKey: "exp_id",
    });
  };
  return ExpDetailModel;
};

export default ExpDetail;
