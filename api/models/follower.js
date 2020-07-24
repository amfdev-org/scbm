const database = require("../database");
const sequelize = database.sequelize;
const DataTypes = database.DataTypes;
const Op = database.Op

const Follower = sequelize.define("follower", {
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    searchUrl: {
        type: DataTypes.STRING,
        allowNull: false
        },
    profileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
        },
    profileName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
        },
    searchUrlProfileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        },
    messaged: {
        type: DataTypes.STRING,
        allowNull: true
        }
  
});


    
let logFollowers = (data) => {

    console.log("follower model log followers");
    //console.log(data);
    /*for (const follower of data) {
            
            const findOrCreate = Follower.findOrCreate({
                where: {
                  searchUrl: follower.searchUrl,
                  profileName: follower.profileName,
                  profileUrl: follower.profileUrl   
                }})

    }*/
    
    Follower.bulkCreate(data, {
        ignoreDuplicates: true
    });

}

//Follower.sync({ force: true });

module.exports = { Follower, logFollowers };