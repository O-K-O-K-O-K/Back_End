const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                userId: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                userEmail: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                userNickname: {
                    type: Sequelize.STRING,
                },
                userGender: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                userAge: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                userImage: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                userLocation: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                modelName: 'User',
                tableName: 'user',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }
    static associate(db) {
        db.User.hasMany(db.Dog, {
            foreignKey: 'userId',
            sourceKey: 'userId',
        });
        db.User.hasMany(db.Post, {
            foreignKey: 'userId',
            sourceKey: 'userId',
        });
        db.User.hasMany(db.DogSta, {
            foreignKey: 'userId',
            sourceKey: 'userId',
        });
        db.User.hasMany(db.Comment, {
            foreignKey: 'userId',
            sourceKey: 'userId',
        });
        db.User.hasMany(db.Likes, {
            foreignKey: 'userId',
            sourceKey: 'userId',
        });
        db.User.hasMany(db.Chat, {
            foreignKey: 'receiverId',
            sourceKey: 'userId',
        });
        db.User.hasMany(db.Notification, {
            foreignKey: 'senderId',
            sourceKey: 'userId',
        });
    }
};