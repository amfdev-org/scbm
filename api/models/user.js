const dotenv = require('dotenv').config()
const database = require("../database");
const sequelize = database.sequelize;
const DataTypes = database.DataTypes;
const Op = database.Op;
const moment = require('moment');
const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    scUsername: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    scPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    scCookies: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    hooks: {
      beforeCreate: (user) => {
        //const salt = bcrypt.genSaltSync();
        user.scPassword = cryptr.encrypt(user.scPassword);
      }
    }
});


User.prototype.validPassword = function(password) {
    return password === cryptr.decrypt(this.scPassword);
};


User.prototype.decryptPassword = function() {
    return cryptr.decrypt(this.scPassword);
};

//User.sync({ force: true });

module.exports = User;