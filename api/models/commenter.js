const database = require("../database");
const sequelize = database.sequelize;
const DataTypes = database.DataTypes;

const Commenter = sequelize.define("commenter", {
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    lastSearchedSongUrl: {
        type: DataTypes.STRING,
        allowNull: true
        },
    profileUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
        },
    lastMessaged: {
        type: DataTypes.STRING,
        allowNull: true
        },
    messageIds: {
        type: DataTypes.STRING,
        allowNull: true
        }
  
});



let checkCommenterMessageStatus = (profileUrlArray) => {
    
    console.log('commenter model');
    console.log(profileUrlArray);
    return new Promise((resolve, reject) => {
    
    /*const profileUrlArray = [
        { profileUrl: 'https://soundcloud.com/ocmoon' },
        { profileUrl: 'https://soundcloud.com/fogcapture' },
        { profileUrl: 'https://soundcloud.com/patrickxtaylor' },
        { profileUrl: 'https://soundcloud.com/deceivingsounds' },
        { profileUrl: 'https://soundcloud.com/matcatmusic' }
      ];*/
    
    let profileUrlArrayLength = profileUrlArray.length;
    
    let compositeArray = [];
    
    for (var i = 0 ; i < profileUrlArrayLength; i++) {
        
            let profileUrlToFind = profileUrlArray[i].profileUrl;
            
            const commenter = Commenter.findOne({ where: { profileUrl: profileUrlToFind }})
            .then(commenter => {
    
                if (commenter) {
                    compositeArray.push({ profileUrl: profileUrlToFind, messagedBefore : "Yes"});
                } else {
                    compositeArray.push({ profileUrl: profileUrlToFind, messagedBefore : "No"});
                }
                 //console.log(compositeArray);
                 if (compositeArray.length == profileUrlArrayLength) {
                    resolve(compositeArray);
                 }
                 
            }).catch(err => {
                console.log(err)
            })
        
        }
    
    })

}


module.exports = { Commenter, checkCommenterMessageStatus };