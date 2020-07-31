const dotenv = require('dotenv').config()
const fs = require('fs');
const utils = require('./scrapers/utils');    
const moment = require('moment')

const { Sequelize, DataTypes, Op } = require('sequelize');

const util = require('util');
const offset = new Date().getTimezoneOffset();
const timestamp = moment().subtract(offset, "minutes").toISOString();

const log_file = fs.createWriteStream(utils.logPath + '/debug.log', {flags : 'a'});
const log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(timestamp + ' ' + util.format(d) + '\n');
  log_stdout.write(timestamp + ' ' + util.format(d) + '\n');
};


/*const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
});*/


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    //logging: console.log,
    timezone: "Europe/London",
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