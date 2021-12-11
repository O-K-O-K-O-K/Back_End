const Sequelize = require("sequelize");

module.exports = class DeleteChat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        deleteChatId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        receiverId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        senderId: {
          type: Sequelize.INTEGER,
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
        modelName: "DeleteChat",
        tableName: "deleteChat",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.DeleteChat.belongsTo(db.Chat, {
      foreignKey: "chatId",
      sourceKey: "chatId",
      onUpdate: "CASCADE",
    });
  }
};
