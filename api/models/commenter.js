const database = require("../database");
const sequelize = database.sequelize;
const DataTypes = database.DataTypes;
const Op = database.Op

const Commenter = sequelize.define("commenter", {
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    songUrl: {
        type: DataTypes.STRING,
        allowNull: true
        },
    profileUrl: {
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
        }
  
});


    
let logCommenters = (data) => {

    for (const commenter of data) {
            
            const findOrCreate = Commenter.findOrCreate({
                where: {
                  songUrl:    commenter.songUrl,
                  profileUrl:      commenter.profileUrl   
                }})

    }

}


module.exports = { Commenter, logCommenters };