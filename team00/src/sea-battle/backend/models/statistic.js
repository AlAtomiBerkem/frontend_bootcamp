module.exports = (sequelize, DataTypes) => {
  const Statistic = sequelize.define(
    "Statistic",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      game_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      wins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      loses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {}
  );

  Statistic.associate = function (models) {
    Statistic.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Statistic.belongsToMany(models.Ship, {
      through: "UserStatisticShips",
      foreignKey: "statisticId",
      otherKey: "shipId",
    });
  };

  return Statistic;
};
