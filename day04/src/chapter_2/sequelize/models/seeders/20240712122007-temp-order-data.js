module.exports = {
  up: async (queryInterface, Sequelize) => {
    const menuItems = await queryInterface.sequelize.query(
      'SELECT id FROM "MenuItems";',
    );

    const menuItemRows = menuItems[0];

    await queryInterface.bulkInsert('Orders', [
      {
        isActive: true,
        itemId: menuItemRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isActive: false,
        itemId: menuItemRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
