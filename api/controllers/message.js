const db = require('../database')
const Op = db.Op;

const utils = require('../utils')
const MessageScraper = require('../scrapers/message')
const FollowerModel = require('../models/follower')
const MessageModel = require('../models/message')

module.exports.getSentMessages = (req, res) => {
    
    console.log('GET /sent-message/');
    
    if (!req.session.user) {
        console.log('no session')
        res.end();
    }
    
    let checkForLoggedMessages = (data) => {
        
        return new Promise((resolve, reject) => {
            
            let userSettings = JSON.parse(req.session.user.userSettings);
      
            var messageStatus;
            if (userSettings.isTestMode === "true") {
                console.log('GET sent-messages - test mode');
                var messageStatus = "Success - Test";
            } else {
                var messageStatus = "Success";
            }
            
            MessageModel.Message.findAll({
                where: {
                      sender: req.session.user.scUsername,
                      messageResult: messageStatus
                    },
                    order: [
                    ['createdAt', 'DESC']
                    ],
                })
                .then(function (messages) {
                    //console.log(messages);
                    //console.log('check for logged messages then block')
                    //console.log(data)
                    if (messages.length === 0) {
                        console.log('no logged messages')
                    }
                    
                    //res.send(JSON.stringify({loginSuccess: false, userFound: false, scCookiesValid: null, loginError: "user not valid", userData: null}));
                    resolve(messages)
                
        
                }).catch(error => {
                   console.log(error)
                   reject(error)
                });
        
        })
    
    }

     
        // run the promises!
      checkForLoggedMessages()
      .then(data => {
        //console.log(data)
          //console.log("**sending message result data to browser**");
          res.send({success: true, noResults: false, messageData: data})
      })
      .catch(error => {
        console.log(error);
        console.log(error.error);
          //emptyArr = [];
          if (error.error === "no messages") {
              //console.log('yes');
                  res.send({success: true, noResults: true, messageData: "no messages"})
          } else {
                  res.send({success: false, noResults: false, messageData: null})
          }
      })       
    
    
}


module.exports.getReceivedMessages = (req, res) => {
    
console.log('GET /received message/');
    
    if (!req.session.user) {
        console.log('no session')
        res.end();
    }
    
    let checkForLoggedMessages = (data) => {
        
        return new Promise((resolve, reject) => {
          
            console.log("checkForLoggedMessages")

            if (req.query.forceRefresh === "true") {
                console.log('force refresh');
                resolve({messages: null, hasRecentLoggedMessages: false})
            }
             
            hasRecentLoggedMessages = false;
             
            MessageModel.Message.findAll({
                where: {
                      recipient: req.session.user.scUsername,
                      messageResult: "Success",
                      updatedAt: {
                        [Op.gte]: db.sequelize.literal('NOW() - INTERVAL 1 HOUR')
                      },
                    },
                    order: [
                    ['createdAt', 'DESC']
                    ],
                })
                .then(function (messages) {
                    //console.log(messages);
                    console.log('check for logged messages then block')
                    //console.log(data)
                   
                    if (messages.length > 0) {
                        console.log('has recent logged messages!');
                        hasRecentLoggedMessages = true;
                    } 
                    
                    //res.send(JSON.stringify({loginSuccess: false, userFound: false, scCookiesValid: null, loginError: "user not valid", userData: null}));
                    resolve({messages: messages, hasRecentLoggedMessages: hasRecentLoggedMessages})
                
        
                }).catch(error => {
                   console.log(error)
                   reject(error)
                });
        
        })
    
    }
    
    
    let scrapeReceivedMessages = (data) => {
            
        return new Promise((resolve, reject) => {
                             
            if (data.messages && data.messages.length > 0) {
               
               resolve({messages: data.messages, hasRecentLoggedMessages: true})
               //console.log('resolving logged followers instead of scraping')
               
           } else {
           
               //console.log(data.searchUrl)
                               
                console.log('scrape inbox')
                   //console.log(data.searchUrl)            
                   MessageScraper
                   .scrapeNewMessages("https://soundcloud.com", req.session.user.scCookies, req.session.user.scUsername, req.session.user.scProfile)
                     .then(scrapedMessages => {
                       //console.log(scrapedMessages)
                        resolve({messages: scrapedMessages, hasRecentLoggedMessages: false})
                       })
                       .catch(error => reject(error))
            }
           
           
        })
    }
    

    
        // run the promises!
      checkForLoggedMessages()
      .then(data => scrapeReceivedMessages(data))
      .then(data => {
        //console.log(data)
            if (!data.hasRecentLoggedMessages) {
              MessageModel.logMessages(data.messages);
            } 
          //console.log("**sending message result data to browser**");
          res.send({success: true, noResults: false, messageData: data.messages})
      })
      .catch(error => {
        console.log(error);
        console.log(error.error);
          //emptyArr = [];
          if (error.error === "no messages") {
              //console.log('yes');
                  res.send({success: true, noResults: true, messageData: "no messages"})
          } else {
                  res.send({success: false, noResults: false, messageData: null})
          }
      })
        
            
    }
    
module.exports.postMessage = (req, res) => {
    if (!req.session.user) {
        console.log('no session')
        res.end();
    }
    
    //console.log(req.body)
    
    console.log('POST /message/');

        let validateMessage = () => {
           
           return new Promise((resolve, reject) => {
               
               let selectedProfiles = req.body.selectedProfiles;
               let message = req.body.message;
               let searchUrl = decodeURI(req.body.searchUrl);
       
               if (!searchUrl.includes("soundcloud")) {
                   reject("Search URL does not contain 'soundcloud'");
                   //res.send(JSON.stringify({errorMessage : "Server says: could not get commenters!"}))
               } else if (message.length < 10) {
                   reject("Message is not long enough");
                   //res.send(JSON.stringify({errorMessage : "Server says: could not get commenters!"}))
               } else if (selectedProfiles.length < 1) {
                   reject("No commenters selected");
                   //res.send(JSON.stringify({errorMessage : "Server says: could not get commenters!"}))
               } else {
                   resolve();
               }
           })
           
       }
       
    
        let getPasswordPlain = () => {
        
            return new Promise((resolve, reject) => {
            
                UserModel.User.findOne({ where: { scUsername: req.session.user.scUsername } })
                    .then(function (user) {
                        if (!user) {
                            console.log('user not found')
                            reject('user not found')
                        } else {
                            //console.log(scUsername);
                            let scPasswordPlain = user.decryptPassword();
                            //console.log(scPasswordPlain)
                            resolve(scPasswordPlain);
                        }
                    }).catch(error => {
                       console.log(error)
                       reject(error)
                    });
            
            })
        }
    
        let sendMessageOnProfile = (scPasswordPlain) => {
            
            return new Promise((resolve, reject) => {
                
            MessageScraper
            .sendMessageOnProfile(
                                  req.session.user.scCookies,
                                  req.body.selectedProfiles,
                                  req.body.message,
                                  req.session.user.scUsername,
                                  req.session.user.scProfile,
                                  req.body.messageType,
                                  req.body.isTestMode
                                  )
              .then(data => {
                ///console.log(data)
                resolve(data)
              })
              .catch(err => reject(err))
             })
        }
    
    
        // run the promises!
        validateMessage()
        .then(data => sendMessageOnProfile())
        .then(data => {
          //console.log(data)
            //console.log("**logging message result to db**");
            MessageModel.logMessages(data);
            //console.log("**sending message result data to browser**");
            res.send({success: true, error: null, result: data })
        })
        .catch(e => {
          console.log(e);
          res.send({success: false, error : "Message send failed!", result: null})
        })
        

}