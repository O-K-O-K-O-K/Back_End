const Sequelize = require("sequelize");

module.exports = class DogSta extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        dogPostId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        dogPostImage: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        dogPostDesc: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "DogSta",
        tableName: "dogSta",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.DogSta.belongsTo(db.User, {
      foreignKey: "userId",
      sourceKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    db.DogSta.hasMany(db.Comment, {
        foreignKey: 'dogPostId',
        sourceKey: 'dogPostId',
    });
    db.DogSta.hasMany(db.Likes, {
        foreignKey: 'dogPostId',
        sourceKey: 'dogPostId',
    });
  }
};
