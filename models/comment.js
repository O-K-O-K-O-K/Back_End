const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        commentId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        commentDesc: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Comment",
        tableName: "comment",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User, {
      foreignKey: "userId",
      sourceKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    db.Comment.belongsTo(db.DogSta, {
      foreignKey: "dogPostId",
      sourceKey: "dogPostId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  }
};
