module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('MenuItems', [
      {
        title: 'Pizza Margherita',
        picture: 'https://example.com/pizza-margherita.jpg',
        cost: 10,
        callQuantity: 1,
        description: 'Tomato sauce, mozzarella cheese, and fresh basil.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pizza Pepperoni',
        picture: 'https://example.com/pizza-pepperoni.jpg',
        cost: 12,
        callQuantity: 1,
        description: 'Tomato sauce, mozzarella cheese, and pepperoni.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MenuItems', null, {});
  },
};
