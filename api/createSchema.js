const dotenv = require('dotenv').config()

const { Sequelize, DataTypes, Op } = require('sequelize');

const CommenterModel = require('./models/commenter');
const FollowerModel = require('./models/follower');
const MessageModel = require('./models/message');
const SearchModel = require('./models/search');
const UserModel = require('./models/user');

//create the sequelize instance, omitting the database-name arg
const sequelize = new Sequelize("", process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql"
});

sequelize.query("CREATE DATABASE `"+process.env.DB_NAME+"`;").then(data => {
    
    console.log("database schema created");
    
    CommenterModel.createTable();
    FollowerModel.createTable();
    MessageModel.createTable();
    SearchModel.createTable();
    UserModel.createTable();
    
});