module.exports = (sequelize, DataTypes) => {
  const Ship = sequelize.define(
    "Ship",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  Ship.associate = function (models) {
    Ship.belongsToMany(models.Statistic, {
      through: "UserStatisticShips",
      foreignKey: "shipId",
      otherKey: "statisticId",
    });
  };

  return Ship;
};
