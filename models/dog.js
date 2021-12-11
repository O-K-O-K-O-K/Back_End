const Sequelize = require("sequelize");

module.exports = class Dog extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        dogId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        dogGender: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dogName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dogSize: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dogBreed: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dogAge: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        neutral: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dogComment: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dogImage: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Dog",
        tableName: "dog",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Dog.belongsTo(db.User, {
      foreignKey: "userId",
      sourceKey: "userId",
      onUpdate: "CASCADE",
    });
  }
};
