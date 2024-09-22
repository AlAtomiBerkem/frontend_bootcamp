const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 3001 // укажите номер порта, на котором запущен ваш сервер
});

module.exports = sequelize;
