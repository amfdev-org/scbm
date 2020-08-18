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
        allowNull: false,
        unique: true
        },
    messaged: {
        type: DataTypes.STRING,
        allowNull: true
        }
});

    
let logCommenters = (data) => {

    Commenter.bulkCreate(data, {
            updateOnDuplicate: ['updatedAt']
    });

    /*for (const commenter of data) {
            
            const findOrCreate = Commenter.findOrCreate({
                where: {
                  searchUrl:    commenter.searchUrl,
                  profileUrl:      commenter.profileUrl   
                }})

    }*/

}

//Commenter.sync({ force: true });
Commenter.sync();
module.exports = { Commenter, logCommenters };