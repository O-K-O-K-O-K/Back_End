const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        postId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        meetingDate: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        wishDesc: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        completed: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },
        locationCategory: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dogCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        startLocationAddress: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        endLocationAddress: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        totalDistance: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        totalTime: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        routeColor: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        routeName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Post",
        tableName: "post",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User, {
      foreignKey: "userId",
      sourceKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  }
};
