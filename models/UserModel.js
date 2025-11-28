const User = (sequelize, DataTypes) => {
  const UserModel = sequelize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING, //karena role cuma 1 yaitu admin jadi tipedata nya string
        allowNull: false,
        defaultValue: "admin",
      },
      refresh_token: {
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return UserModel;
};

export default User;
