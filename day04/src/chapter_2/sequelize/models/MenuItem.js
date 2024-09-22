const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define("MenuItem", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picture: { // исправлено название поля на picture
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        callQuantity: { // исправлено название поля на callQuantity
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};
