const Sequelize = require("sequelize");

module.exports = class Chat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        chatId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        senderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        senderNickname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        message: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Chat",
        tableName: "chat",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Chat.belongsTo(db.User, {
      foreignKey: "receiverId",
      sourceKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    db.Chat.hasMany(db.DeleteChat, {
      foreignKey: "chatId",
      sourceKey: "chatId",
    });
  }
};
