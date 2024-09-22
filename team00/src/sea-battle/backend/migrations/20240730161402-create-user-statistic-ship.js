"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UserStatisticShips", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ship_count: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      statisticId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Statistics",
          key: "id",
          as: "statisticId",
        },
      },
      shipId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Ships",
          key: "id",
          as: "shipId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("UserStatisticShips");
  },
};
