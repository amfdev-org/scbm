const dotenv = require('dotenv').config()
const fs = require('fs');
const sanitize = require("sanitize-filename");
const moment = require('moment')
const express = require('express')
const app = express()
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);

const MySQLStoreOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};
 
var sessionStore = new MySQLStore(MySQLStoreOptions);

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const utils = require('./scrapers/utils')
const util = require('util');

const offset = new Date().getTimezoneOffset();
const timestamp = moment().subtract(offset, "minutes").toISOString();

const log_file = fs.createWriteStream(utils.logPath + '/debug.log', {flags : 'a'});
const log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(timestamp + ' ' + util.format(d) + '\n');
  log_stdout.write(timestamp + ' ' + util.format(d) + '\n');
};

const CommenterScraper = require('./scrapers/CommenterScraper')
const LoginScraper = require('./scrapers/LoginScraper')
const TestScraper = require('./scrapers/TestScraper')
const MessageScraper = require('./scrapers/MessageScraper')
const FollowerScraper = require('./scrapers/FollowerScraper')

const db = require('./database')
const Op = db.Op;
const CommenterModel = require('./models/commenter')
const MessageModel = require('./models/message')
const UserModel = require('./models/user')
const FollowerModel = require('./models/follower')

app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    name: process.env.EXPRESS_SESSION_NAME,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
        httpOnly: false,
        secure: false,
        maxAge: null
    }
}))


app.get('/auth/', (req, res) => {
    
    console.log('GET /auth/');
    //console.log(req.headers);
    
    let validateHeaders = () => {
        
        return new Promise((resolve, reject) => {
            
             if (req.headers['x-request-app'] !== 'scbm') {
                   console.log('forbidden')
                    reject('forbidden')
                    res.sendStatus(403)  
                
            } else {
                resolve()
            }
            
        })
    
     }
     
    let validateSession = () => {
        
        return new Promise((resolve, reject) => {
            
            if (req.session.user && req.cookies.scbm_sid) {
                console.log('authd - req.sesssion.user && req.cookies.scbm_sid are valid')
                resolve(true)
            } else {
                console.log('not authd - req.sesssion.user && req.cookies.scbm_sid are invalid')
             
                //res.send(JSON.stringify({authResult: false}));
                res.send(JSON.stringify({authSuccess: false, sessionValid: false, scCookiesValid: null, authError: "session invalid", userData: null}));
                reject('session invalid')
            }
        
        });
                       
    }
    
    
    let validateScCookies = () => {
        
        return new Promise((resolve, reject) => {
            
            utils.validateScCookies(req.session.user)
            .then(data => {
                //console.log(data)
                resolve(data)
            })
            .catch(error => {

                console.log(error)
               
                res.send(JSON.stringify({authSuccess: false, sessionValid: true, scCookiesValid: false, authError: "cookies invalid", userData: null}));
                reject("sc cookies not valid")
                
            })
        
        });
                       
    }
    
        
    // run the promises!
    validateHeaders()
        .then(data => validateSession())
        .then(data => validateScCookies())
        .then(data => {
            res.send(JSON.stringify({authSuccess: true, sessionValid: true, scCookiesValid: true, authError: null, userData: req.session.user}));
        })
        .catch(error => {
                 
          console.log(error);

        })
                
})



app.post('/signup/', (req, res) => {
    
    console.log('POST /signup/');
    
    //console.log(sanitizedUsername);
    //console.log(req.headers)
    
     let validateHeaders = () => {
        
        return new Promise((resolve, reject) => {
            
            if (req.headers['origin'] !== 'https://scbm.amfdev.co.uk') {
                    console.log('forbidden')
                    reject('forbidden')
                    res.sendStatus(403)
        
            } else if (req.headers['x-request-app'] !== 'scbm') {
                   console.log('forbidden')
                    reject('forbidden')
                    res.sendStatus(403)  
                
            } else {
                resolve()
            }
            
        })
    
     }
     
    let retrieveUser = () => {
       
       return new Promise((resolve, reject) => {
           
           UserModel.findOne({ where: { scUsername: req.body.scUsername } })
               .then(function (user) {
                   
               if (user) {
                   
                       console.log('user already exists')
                       res.send(JSON.stringify({ signupSuccess: false, userAlreadyExists: true, scLoginSuccess: null, scCookiesValid: null, userCreated: null, error: "user already exists", userData: null}));
                       reject('user already exists')
                   
                   } else {
                        resolve()
                   }
                   
               }).catch(error => {
                  console.log(error)
                  reject(error)
               });
           
       });
    
    }
    
        
    let tryScLogin = () => {
        
        return new Promise((resolve, reject) => {
            
        if(!req.body.scUsername || req.body.scUsername.length < 5 || !req.body.scPassword || req.body.scPassword.length < 6) {
      //needs to do a login
            console.log('signup username or password missing or too short')
            reject('signup username or password missing or too short')
            res.send(JSON.stringify({ signupSuccess: false, userAlreadyExists: false, scLoginSuccess: null, scCookiesValid: null, userCreated: null, error: "signup username or password missing or too short", userData: null}));
        
        } else {
            
            LoginScraper
            .login("https://soundcloud.com/signup",
                   req.body.scUsername,
                   req.body.scPassword,
                   sanitize(req.body.scUsername)
                   )
              .then(data => {
                console.log('tryScLogin signup promise - resolve data');
                //console.log(data);
                
                resolve(data)
              })
              .catch(error => {
                    console.log(error)
                    res.send(JSON.stringify({ signupSuccess: false, userAlreadyExists: false, scLoginSuccess: false, scCookiesValid: null, userCreated: false, error: "service login failed", userData: null}));
                    reject(error)
                    
                })
              
            }
          
         })
    }
    
    let validateScCookies = (data) => {
        
        return new Promise((resolve, reject) => {
            
            utils.validateScCookies(data)
            .then(data => {
                //console.log(data)
                console.log('validate sc cookies signup promise - resolve scCookies');
                //console.log(data);
                
                resolve(data)
   
            })
            .catch(error => {
                //console.log(scCookies + ' cookies not valid')
                res.send(JSON.stringify({ signupSuccess: false, userAlreadyExists: false, scLoginSuccess: true, scCookiesValid: false, userCreated: false, error: "cookies not valid", userData: null}));
                reject("sc cookies not valid")
                
            })
        
        });
                       
    }
    
    let createUser = (data) => {
        
        return new Promise((resolve, reject) => {
            
            UserModel.create({
                scUsername: req.body.scUsername,
                scPassword: req.body.scPassword,
                scCookies: data.scCookies,
                scProfile: data.scProfile
            }).then(user => {
                req.session.user = user.dataValues;
                //console.log(user.dataValues);
                console.log('createUser signup promise - resolve user.dataValues');
                //console.log(user.dataValues);
                
                resolve(user.dataValues)
            })
            .catch(error => {
                //console.log(error)
                res.send(JSON.stringify({ signupSuccess: false, userAlreadyExists: false, scLoginSuccess: true, scCookiesValid: true, userCreated: false, error: "user could not be created", userData: null}));
                reject(error)
                
            });
            
        })
    }
              
        // run the promises!
    validateHeaders()
        .then(data => retrieveUser())
        .then(data => tryScLogin())
        .then(data => validateScCookies(data))
        .then(data => createUser(data))
        .then(data => {
            console.log("**logged commenters to DB**");
            console.log("**sending data to browser**");
            res.send(JSON.stringify({ signupSuccess: true, userAlreadyExists: false, scLoginSuccess: true, scCookiesValid: true, userCreated: true, error: null, userData: data}));
        })
        .catch(error => {
            
          console.log(error);

            
        })
        
});



app.post('/login/', (req, res) => {
    
        console.log('POST /login/');
        
        let retrieveUser = () => {
            
            return new Promise((resolve, reject) => {
                
                UserModel.findOne({ where: { scUsername: req.body.scUsername } })
                    .then(function (user) {
                        
                    if (!user) {
                        
                            console.log('user not found')
                            res.send({ loginSuccess: false, userFound: false, scCookiesValid: null, loginError: "user not valid", userData: null });
                            reject('user not found')
                        
                        } else if (!user.validPassword(req.body.scPassword)) {
                            
                            console.log('password not valid')
                            res.send({ loginSuccess: false, userFound: false, scCookiesValid: null, loginError: "password not valid", userData: null });
                            reject('password not valid')
                             
                        } else {
                            console.log('user found')
                            resolve(user.dataValues)
                        }
                    }).catch(error => {
                       console.log(error)
                       reject(error)
                    });
                
            });
        
        }
        
                
        let validateScCookies = (user) => {
            
            return new Promise((resolve, reject) => {
                
                utils.validateScCookies(user)
                .then(data => {
                    //console.log(data)
                    resolve(user)
                })
                .catch(error => {
                    //console.log(error)
                    console.log(error)
                    reject("sc cookies not valid")
                    res.send({loginSuccess: false, userFound: true, scCookiesValid: false, loginError: "cookies not valid", userData: null });
                    
                })
            
            });
                           
        }
        
        
        // run the promises!
        retrieveUser()
        .then(user => validateScCookies(user))
        .then(user => {
            req.session.user = user;
            res.send({loginSuccess: true, userFound: true, scCookiesValid: true, loginError: null, userData: req.session.user} );
        })
        .catch(error => {
            console.log(error);
          
        })
        
});



app.get('/commenters/', function(req, res) {
    
    if (!req.session.user) {
        console.log('no session')
        res.end();
    }
    
    console.log('GET /commenters/');

    let validateCommentersSearchUrl = () => {
        
        return new Promise((resolve, reject) => {
            
            let searchUrl = decodeURI(req.query.searchUrl);
    
            if (!searchUrl.includes("soundcloud")) {
                reject("Search URL does not contain 'soundcloud'");
                //res.send(JSON.stringify({errorMessage : "Server says: could not get commenters!"}))
            } else {
                resolve({searchUrl: searchUrl});
            }
        })
        
    }

    hasRecentLoggedCommenters = false;
    let checkForLoggedCommenters = (data) => {
        
        return new Promise((resolve, reject) => {
            console.log("checkForLoggedCommenters")
      
            CommenterModel.Commenter.findAll({
                where: {
                      searchUrl: data.searchUrl,
                      updatedAt: {
                          [Op.gte]: db.sequelize.literal('NOW() - INTERVAL 12 HOUR')
                      }
                    }
                })
                .then(function (commenters) {
                    //console.log(commenters);
                    console.log('check for logged commenters then block')
                    //console.log(data)
                    if (commenters.length > 0) {
                        console.log('found recent logged commenters!!')
                        hasRecentLoggedCommenters = true;
                    }
                    
                    //res.send(JSON.stringify({loginSuccess: false, userFound: false, scCookiesValid: null, loginError: "user not valid", userData: null}));
                    resolve({ searchUrl: data.searchUrl, commenters: commenters, hasRecentLoggedCommenters: hasRecentLoggedCommenters })
                
        
                }).catch(error => {
                   console.log(error)
                   reject(error)
                });
        
        })
    
    }
      
           

    let scrapeCommenters = (data) => {
            
        return new Promise((resolve, reject) => {
            console.log('scrape commenters')
           if (data.commenters.length > 0) {
               
               resolve({ searchUrl: data.searchUrl, commenters: data.commenters, hasRecentLoggedCommenters: true })
               console.log('resolving logged commenters instead of scraping')
           } else {
           
               //console.log(data.searchUrl)
               
               CommenterScraper
               .scrapeCommenters(data.searchUrl, req.session.user.scCookies)
                 .then(scrapedCommenters => {
                   //console.log(scrapedCommenters)
                    resolve({ searchUrl: data.searchUrl, commenters: scrapedCommenters, hasRecentLoggedCommenters: false })
                   })
                   .catch(error => reject(error))
           
           }
        })
    }
    
            
        // run the promises!
        validateCommentersSearchUrl()
        .then(data => checkForLoggedCommenters(data))
        .then(data => scrapeCommenters(data))
        .then(data => MessageModel.checkCommentersMessageStatus(data))
        .then(data => {
            //console.log(data)
            if (!data.hasRecentLoggedCommenters) {
                    console.log("**logged commenters to DB**");
                    CommenterModel.logCommenters(data.commenters);
            }
           
            console.log("**sending data to browser**");
            //console.log(JSON.stringify(data))
            res.send({success: true, noResults: false, commenterData: data.commenters})
        })
        .catch(error => {
          console.log(error);
          console.log(error.error);
            //emptyArr = [];
            if (error.error === "no commenters") {
                //console.log('yes');
                 res.send({success: false, noResults: true, commenterData: "no commenters"})
            } else {
                 res.send({success: false, noResults: false, commenterData: null})
            }
        })
        
    
})
        
        
app.get('/followers/', function(req, res) {
      
    //console.log('GET /followers/');
    
    if (!req.session.user) {
        console.log('no session')
        res.end();
    }
    
    //console.log(req)
    //console.log(req.session.user)
     
    let validateFollowersSearchUrl = () => {
        
        return new Promise((resolve, reject) => {
            
            let searchUrl = decodeURI(req.query.searchUrl);
            
            let isMyFollowersSearch = false;

            if (!searchUrl.includes("soundcloud")) {
                 //console.log("Search URL does not contain 'soundcloud'")
                reject("Search URL does not contain 'soundcloud'");
                //res.send(JSON.stringify({errorMessage : "Server says: could not get followers!"}))
            } else if (searchUrl === req.session.user.scProfile) {
                //console.log('is my follower search')
                //console.log(isMyFollowersSearch)
                resolve({searchUrl: searchUrl, isMyFollowersSearch: true});
            } else {
      
                //console.log('is my follower search')
                //console.log(isMyFollowersSearch)
                resolve({searchUrl: searchUrl, isMyFollowersSearch: false});
            }
        })
        
    }
    
    hasRecentLoggedFollowers = false;
      let checkForLoggedFollowers = (data) => {
        
        return new Promise((resolve, reject) => {
            console.log("checkForLoggedFollowers")
            
            if (data.isMyFollowersSearch) {
                var cutoff = 'NOW() - INTERVAL 12 HOUR';
            } else {
                var cutoff = 'NOW() - INTERVAL 1 WEEK';
            }
            
            FollowerModel.Follower.findAll({
                where: {
                      searchUrl: data.searchUrl,
                      updatedAt: {
                          [Op.gte]: db.sequelize.literal(cutoff)
                      }
                    }
                })
                .then(function (followers) {
                    //console.log(followers);
                    console.log('check for logged followers then block')
                    //console.log(data)
                    if (followers.length > 0) {
                        hasRecentLoggedFollowers = true;
                        console.log('FOUND logged followers!')
                    }
                    
                    //res.send(JSON.stringify({loginSuccess: false, userFound: false, scCookiesValid: null, loginError: "user not valid", userData: null}));
                    resolve({ searchUrl: data.searchUrl, isMyFollowersSearch: data.isMyFollowersSearch, followers: followers, hasRecentLoggedFollowers: hasRecentLoggedFollowers })
                
        
                }).catch(error => {
                   console.log(error)
                   reject(error)
                });
        
        })
    
      }
    
    
    let scrapeFollowers = (data) => {
            
        return new Promise((resolve, reject) => {
            console.log('scrape followers')
           if (data.followers.length > 0) {
               
               resolve({ searchUrl: data.searchUrl, isMyFollowersSearch: data.isMyFollowersSearch, followers: data.followers, hasRecentLoggedFollowers: true })
               console.log('resolving logged followers instead of scraping')
           } else {
           
               //console.log(data.searchUrl)
               
               FollowerScraper
               .scrapeFollowers(data.searchUrl, req.session.user.scCookies)
                 .then(scrapedFollowers => {
                   //console.log(data)
                    resolve({ searchUrl: data.searchUrl, isMyFollowersSearch: data.isMyFollowersSearch, followers: scrapedFollowers, hasRecentLoggedFollowers: false })
                   })
                   .catch(error => reject(error))
           
           }
        })
    }
    
        
        // run the promises!
        validateFollowersSearchUrl()
        .then(data => checkForLoggedFollowers(data))
        .then(data => scrapeFollowers(data))
        .then(data => MessageModel.checkFollowersMessageStatus(data))
        .then(data => {
            //console.log(data)
            if (!data.hasRecentLoggedFollowers) {
                console.log('writing followers to DB');
                FollowerModel.logFollowers(data.followerData);
            }
     
            res.send({success: true, noResults: false, followerData: data.followerData})
        })
        .catch(error => {
          console.log(error);
          console.log(error.error);
            //emptyArr = [];
            if (error.error === "no followers") {
                //console.log('yes');
                    res.send({success: false, noResults: true, followerData: "no followers"})
            } else {
                    res.send({success: false, noResults: false, followerData: null})
            }
        })
        
    
})
    

app.get('/sent-messages/', function(req, res) {
    
    //console.log('GET /sent-message/');
    
    if (!req.session.user) {
        console.log('no session')
        res.end();
    }
    
    let checkForLoggedMessages = (data) => {
        
        return new Promise((resolve, reject) => {
            //console.log("checkForLoggedMessages")
            MessageModel.Message.findAll({
                where: {
                      sender: req.session.user.scUsername,
                      messageResult: "Success"
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
                        //console.log('no logged messages')
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
    
    
});


app.get('/received-messages/', function(req, res) {
    
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
        
            
    
});

app.post('/message/', function(req, res) {
    
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
            
                UserModel.findOne({ where: { scUsername: req.session.user.scUsername } })
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
        
    
        
        /*res.send(JSON.stringify([{message: "message",
            messageResult: "Success",
            profileUrl: "https://soundcloud.com/deceivingsounds",
            searchUrl: "https://soundcloud.com/fogcapture/to-my-roots"},
            {message: "message",
            messageResult: "Error",
            profileUrl: "https://soundcloud.com/alvonmars",
            searchUrl: "https://soundcloud.com/fogcapture/to-my-roots"}]));*/
    
})


app.get('/logout', (req, res) => {
    console.log('logout')
    if (req.session.user) {
        if(req.cookies.scbm_sid) {
            req.session.destroy();
            res.clearCookie('scbm_sid');
            res.send(JSON.stringify({logoutSuccess: true}))
        } else {
            req.session.destroy();
            res.send(JSON.stringify({logoutSuccess: true}))
        }
    }
});

app.get('/download-logs/', function(req, res){
console.log('download logs')
  const file = utils.logPath + "/debug.log";
  res.download(file); // Set disposition and send it.
});


var server = app.listen(3002,() => {
  console.log("Started on PORT 3002")
})

server.setTimeout(900000);