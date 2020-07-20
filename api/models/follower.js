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
        allowNull: true
        },
    profileUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
        },
    profileName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
        },
    messaged: {
        type: DataTypes.STRING,
        allowNull: true
        },
    messageIds: {
        type: DataTypes.STRING,
        allowNull: true
        },
    isMyFollowersSearch: {
        type: DataTypes.STRING,
        allowNull: true
        }
  
});


    
let logFollowers = (data) => {

    for (const follower of data) {
            
            const findOrCreate = Follower.findOrCreate({
                where: {
                  searchUrl: follower.searchUrl,
                  profileName: follower.profileName,
                  profileUrl: follower.profileUrl   
                }})

    }

}

//Follower.sync({ force: true });

module.exports = { Follower, logFollowers };