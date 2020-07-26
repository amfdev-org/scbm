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
    profileName: {
        type: DataTypes.STRING,
        allowNull: true
        },
    message: {
        type: DataTypes.STRING,
        allowNull: true
        },
    searchUrl: {
        type: DataTypes.STRING,
        allowNull: true
        },
    sender: {
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

let checkCommentersMessageStatus = (data) => {
    
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
    
    let compositeArray = [];
    
    for (var i = 0 ; i < data.commenters.length; i++) {
        
            let searchUrl = data.commenters[i].searchUrl;
            let profileUrl = data.commenters[i].profileUrl;
            let profileName = data.commenters[i].profileName;
            
            const message = Message.findOne({ where: { profileUrl: profileUrl, messageResult: "Success"}, order: [ [ 'createdAt', 'DESC' ]] })
            .then(message => {
    
                if (message) {
                    compositeArray.push({
                        searchUrl: searchUrl,
                        profileUrl: profileUrl,
                        profileName: profileName,
                        searchUrlProfileUrl : searchUrl + '^' + profileUrl,
                        messaged : moment(message.createdAt).format("DD/MM/YYYY")});
                } else {
                    compositeArray.push({
                        searchUrl: searchUrl,
                        profileUrl: profileUrl,
                        profileName: profileName,
                        searchUrlProfileUrl : searchUrl + '^' + profileUrl,
                        messaged : "Never"});
                }
                 //console.log(compositeArray);
                 if (compositeArray.length == data.commenters.length) {
                    resolve(compositeArray);
                 }
                 
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        
        }
    
    })

}

let checkFollowersMessageStatus = (data) => {
 
    console.log('follower model');
    //console.log(profileUrlArray);
    //console.log(data)
    return new Promise((resolve, reject) => {
    
    /*const profileUrlArray = [
        { profileUrl: 'https://soundcloud.com/ocmoon' },
        { profileUrl: 'https://soundcloud.com/fogcapture' },
        { profileUrl: 'https://soundcloud.com/patrickxtaylor' },
        { profileUrl: 'https://soundcloud.com/deceivingsounds' },
        { profileUrl: 'https://soundcloud.com/matcatmusic' }
      ];*/
    
    let compositeArray = [];
    
    for (var i = 0 ; i < data.followers.length; i++) {
        
            let searchUrl = data.followers[i].searchUrl;
            let profileUrl = data.followers[i].profileUrl;
            let profileName = data.followers[i].profileName;
            
            const message = Message.findOne({ where: { profileUrl: profileUrl, messageResult: "Success"}, order: [ [ 'createdAt', 'DESC' ]] })
            .then(message => {
    
                if (message) {
                    compositeArray.push({
                        searchUrl: searchUrl,
                        profileUrl: profileUrl,
                        profileName: profileName,
                        searchUrlProfileUrl : searchUrl + '^' + profileUrl,
                        messaged : moment(message.createdAt).format("LLL")});
                } else {
                    compositeArray.push({
                        searchUrl: searchUrl,
                        profileUrl: profileUrl,
                        profileName: profileName,
                        searchUrlProfileUrl : searchUrl + '^' + profileUrl,
                        messaged : "Never"});
                }
                 //console.log(compositeArray);
                 if (compositeArray.length == data.followers.length) {
                    resolve({followerData: compositeArray, isMyFollowersSearch: data.isMyFollowersSearch});
                 }
                 
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        
        }
    
    })

}

//Message.sync({ force: true });

module.exports = { Message,
                logMessages,
                checkCommentersMessageStatus,
                checkFollowersMessageStatus
                };