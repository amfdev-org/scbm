const database = require("../database");
const sequelize = database.sequelize;
const DataTypes = database.DataTypes;
const Op = database.Op
const moment = require('moment');

const Message = sequelize.define("message", {
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    profileUrl: {
        type: DataTypes.STRING,
        allowNull: true
        },
    message: {
        type: DataTypes.STRING,
        allowNull: true
        },
    commenterId: {
        type: DataTypes.STRING,
        allowNull: true
        },
    searchUrl: {
        type: DataTypes.STRING,
        allowNull: true
        },
    messageResult: {
        type: DataTypes.STRING,
        allowNull: true
    }  
  
});


let logMessages = (data) => {

   const insert = 
    Message.bulkCreate(data)
    .then(result => {
        //console.log(result);
        // you can now access the newly ChatMessage task via the variable message
    }).catch(err => {
        console.log(err)
    })
    
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
            let profileUrl = commentersArray[i].profileUrl;
            let profileName = commentersArray[i].profileName;
            
            const message = Message.findOne({ where: { profileUrl: profileUrl, messageResult: "Success"} })
            .then(message => {
    
                if (message) {
                    compositeArray.push({ songUrl: songUrl, profileUrl: profileUrl, profileName: profileName, messaged : moment(message.createdAt).format("DD/MM/YYYY")});
                } else {
                    compositeArray.push({ songUrl: songUrl, profileUrl: profileUrl, profileName: profileName, messaged : "Never"});
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

//Message.sync({ force: true });

module.exports = { Message, logMessages, checkCommenterMessageStatus };