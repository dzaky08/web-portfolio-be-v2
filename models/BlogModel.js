const Blog = (sequelize, DataTypes) => {
  const BlogModel = sequelize.define(
    "blogs",
    {
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      tag: {
        type: DataTypes.STRING,
      },
      img_url: {
        type: DataTypes.STRING,
      },
      web_url: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return BlogModel;
};

export default Blog;
