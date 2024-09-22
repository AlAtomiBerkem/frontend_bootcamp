const { Sequelize, DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orders: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // изменить тип столбца на integer[]
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
