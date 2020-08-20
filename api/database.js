const dotenv = require('dotenv').config()

const { Sequelize, DataTypes, Op } = require('sequelize');

/*const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
});*/

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    //logging: console.log,
    timezone: process.env.DB_TIMEZONE,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timestamps: true
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