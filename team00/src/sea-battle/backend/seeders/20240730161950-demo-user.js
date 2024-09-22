"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          login: "johndoe@gmail.com",
          password: "1234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    const statistics = users.map((user, index) => ({
      game_count: 10 * (index + 1),
      wins: 5 * (index + 1),
      loses: 5 * (index + 1),
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const createdStatistics = await queryInterface.bulkInsert(
      "Statistics",
      statistics,
      { returning: true }
    );

    const ships = await queryInterface.sequelize.query(
      `SELECT id FROM "Ships";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const userStatisticShips = createdStatistics.map((statistic) => ({
      statisticId: statistic.id,
      shipId: ships[0].id, // Пример, связывающий все с первым кораблем (4x cage)
      ship_count: JSON.stringify([
        { id: ships[0].id, destroyed: 5 },
        { id: ships[1].id, destroyed: 3 },
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert(
      "UserStatisticShips",
      userStatisticShips,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("UserStatisticShips", null, {});
    await queryInterface.bulkDelete("Statistics", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
