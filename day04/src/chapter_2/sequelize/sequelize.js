const sequelize = require('./db');

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Здесь можно выполнять операции с базой данных
    // Например, создание моделей, добавление данных и т.д.
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectToDatabase();
