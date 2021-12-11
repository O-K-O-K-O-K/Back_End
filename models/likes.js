const Sequelize = require("sequelize");

module.exports = class Likes extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        LikeId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Likes",
        tableName: "like",
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
    });
    db.Comment.belongsTo(db.DogSta, {
        foreignKey: "dogPostId",
        sourceKey: "dogPostId",
        onUpdate: "CASCADE",
      });
  }
};
