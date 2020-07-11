const dotenv = require('dotenv').config()

const { Sequelize, DataTypes, Op } = require('sequelize');

/*const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
});*/


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mysql",
    logging: function () {},
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        socketPath: "/var/run/mysqld/mysqld.sock"
    },
    define: {
        paranoid: false
    }
});

sequelize
 .authenticate()
 .then(() => {
  console.info('**Database connected**')
 })
.catch(err => {
  console.error('Error! Unable to connect to the database:', err)
 })

module.exports = { sequelize, DataTypes, Op};