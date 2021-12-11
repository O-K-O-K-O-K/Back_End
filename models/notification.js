const Sequelize = require("sequelize");

module.exports = class Notification extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        notificationId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        receiverId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        acceptance: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        senderNickname: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        checkRequest: {
            type: Sequelize.TINYINT,
            allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Notification",
        tableName: "notification",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Notification.belongsTo(db.User, {
      foreignKey: "senderId",
      sourceKey: "userId",
      onUpdate: "CASCADE",
    });
  }
};
