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

    
let checkCommenterMessageStatus = (commentersArray) => {
    
    //console.log('commenter model');
    //console.log(profileUrlArray);
    return new Promise((resolve, reject) => {
    
    /*const profileUrlArray = [
        { profileUrl: 'https://soundcloud.com/ocmoon' },
        { profileUrl: 'https://soundcloud.com/fogcapture' },
        { profileUrl: 'https://soundcloud.com/patrickxtaylor' },
        { profileUrl: 'https://soundcloud.com/deceivingsounds' },
        { profileUrl: 'https://soundcloud.com/matcatmusic' }
      ];*/
    
    let commentersArrayLength = commentersArray.length;
    
    let compositeArray = [];
    
    for (var i = 0 ; i < commentersArrayLength; i++) {
        
            let songUrl = commentersArray[i].songUrl;
            let profileUrlToFind = commentersArray[i].profileUrl;
            
            const commenter = Commenter.findOne({ where: { profileUrl: profileUrlToFind, messaged: {[Op.ne]: null} }})
            .then(commenter => {
    
                if (commenter) {
                    compositeArray.push({ songUrl: songUrl, profileUrl: profileUrlToFind, messaged : commenter.lastMessaged});
                } else {
                    compositeArray.push({ songUrl: songUrl, profileUrl: profileUrlToFind, messaged : "Never"});
                }
                 //console.log(compositeArray);
                 if (compositeArray.length == commentersArrayLength) {
                    resolve(compositeArray);
                 }
                 
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        
        }
    
    })

}


module.exports = { Commenter, logCommenters, checkCommenterMessageStatus };