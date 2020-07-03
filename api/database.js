const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('scbm', 'root', 'Melon10283', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

sequelize
 .authenticate()
 .then(() => {
  console.info('**Database connected**')
 })
.catch(err => {
  console.error('Error! Unable to connect to the database:', err)
 })

module.exports = { sequelize, DataTypes };