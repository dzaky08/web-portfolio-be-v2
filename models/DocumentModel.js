const Document = (sequelize, DataTypes) => {
  const DocumentModel = sequelize.define(
    "documents",
    {
      project_id: {
        type: DataTypes.INTEGER,

        references: {
          model: "projects",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      doc_name: {
        type: DataTypes.STRING,
      },
      doc_type: {
        type: DataTypes.ENUM("proposal_awal", "mockup", "ppt", "laporan_akhir"),
      },
      doc_url: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );

  DocumentModel.associate = function (models) {
    DocumentModel.belongsTo(models.Project, {
      foreignKey: "project_id",
    });
  };
  return DocumentModel;
};

export default Document;
