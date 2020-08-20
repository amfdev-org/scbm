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
        allowNull: true
        },
    profileName: {
        type: DataTypes.STRING,
        allowNull: true
        },
    searchUrlProfileUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
        },
    messaged: {
        type: DataTypes.STRING,
        allowNull: true
        }
  
});


    
let logFollowers = (data) => {

    //console.log("follower model log followers");
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
        updateOnDuplicate: ['updatedAt']
    });

}

const createTable = () => {
      
      Follower.sync()
      .then(result => {
        console.log("Follower table created")
      })
      .catch(error => {
        console.log("Error! Follower table not created")
        console.log(error)
      })
      
}
//Follower.sync({ force: true });

module.exports = { Follower, logFollowers, createTable };