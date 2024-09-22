"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserStatisticShip = sequelize.define(
    "UserStatisticShip",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ship_count: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      statisticId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shipId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );

  return UserStatisticShip;
};
