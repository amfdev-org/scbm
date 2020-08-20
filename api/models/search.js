const database = require("../database");
const sequelize = database.sequelize;
const DataTypes = database.DataTypes;
const Op = database.Op
const moment = require('moment');

const Search = sequelize.define("search", {
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    search: {
        type: DataTypes.STRING,
        allowNull: true
        },
    type: {
        type: DataTypes.STRING,
        allowNull: true
        },
    user: {
        type: DataTypes.STRING,
        allowNull: true
        }
});


let logSearches = (data) => {
    
    Search.bulkCreate(data, {
        updateOnDuplicate: ['updatedAt']
    });
    
}

//Search.sync({ force: true });
const createTable = () => {
      
      Search.sync()
      .then(result => {
        console.log("Search table created")
      })
      .catch(error => {
        console.log("Error! Search table not created")
        console.log(error)
      })
      
}

module.exports = {
                Search,
                logSearches,
                createTable
                };