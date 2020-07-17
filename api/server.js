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

const CommenterScraper = require('./scrapers/CommenterScraper')
const LoginScraper = require('./scrapers/LoginScraper')
const TestScraper = require('./scrapers/TestScraper')
const MessageScraper = require('./scrapers/MessageScraper')
const FollowerScraper = require('./scrapers/FollowerScraper')

const db = require('./database')
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

/*
app.get('/test/', (req, res) => {
    
    //just loads the URL in the params as a test
    var query = Object.keys(req.query); 
    
    if (query.length == 0) {
        url = "soundcloud.com";
    } else {
        url = query;
    }
    
    console.log('test GET query: ' + url);
    
    const scrapeTest = new Promise((resolve, reject) => {
    LoginScraper
    .scrapeTest("https://"+url, false)
      .then(result => {
        resolve(result)
        //console.log(result);
          res.sendFile(utils.screenshotPath + '/screenshot.png');
      })
      .catch(err => res.status(500).send(err))
     })
    
})


app.get('/sctest/', (req, res) => {
    
    console.log('test GET query: sc test');
    
    const scrapeTestSc = new Promise((resolve, reject) => {
    LoadTest
    .scrapeTestSc("https://soundcloud.com")
      .then(result => {
        resolve(result)
        //console.log(result);
          res.sendFile(utils.screenshotPath + '/screenshot.png');
      })
      .catch(err => res.status(500).send(err))
     })
    
})

*/

app.get('/auth/', (req, res) => {
    
    console.log('GET /auth/');
                 
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
            
            utils.validateScCookies(req.session.user.scCookies)
            .then(data => {
                //console.log(data)
                resolve(true)
            })
            .catch(error => {

                console.log(error)
               
                res.send(JSON.stringify({authSuccess: false, sessionValid: true, scCookiesValid: false, authError: "cookies invalid", userData: null}));
                reject("sc cookies not valid")
                
            })
        
        });
                       
    }
    
        
    // run the promises!
    validateSession()
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
    
    if(!req.session.scCookies) {
      //needs to do a login
    }
    //console.log(sanitizedUsername);
    
    let tryScLogin = () => {
        
        return new Promise((resolve, reject) => {
        LoginScraper
        .login("https://soundcloud.com/signin",
               req.body.scUsername,
               req.body.scPassword,
               sanitize(req.body.scUsername)
               )
          .then(data => {
            console.log('tryScLogin signup promise - resolve data');
            //console.log(data);
            
            resolve(data)
            //console.log(result);
          })
          .catch(error => {
                //console.log(error)
                res.send(JSON.stringify({ signupSuccess: false, scLoginSuccess: false, scCookiesValid: null, userCreated: false, error: "service login failed", userData: null}));
                reject(error)
                
            })
         })
    }
    
    let validateScCookies = (scCookies) => {
        
        return new Promise((resolve, reject) => {
            
            utils.validateScCookies(scCookies)
            .then(data => {
                //console.log(data)
                console.log('validate sc cookies signup promise - resolve scCookies');
                console.log(scCookies);
                
                resolve(scCookies)
   
            })
            .catch(error => {
                //console.log(scCookies + ' cookies not valid')
                res.send(JSON.stringify({ signupSuccess: false, scLoginSuccess: true, scCookiesValid: false, userCreated: false, error: "cookies not valid", userData: null}));
                reject("sc cookies not valid")
                
            })
        
        });
                       
    }
    
    let createUser = (scCookies) => {
        
        return new Promise((resolve, reject) => {
            
            UserModel.create({
                scUsername: req.body.scUsername,
                scPassword: req.body.scPassword,
                scCookies: scCookies
            }).then(user => {
                req.session.user = user.dataValues;
                //console.log(user.dataValues);
                console.log('createUser signup promise - resolve user.dataValues');
                console.log(user.dataValues);
                
                resolve(user.dataValues)
            })
            .catch(error => {
                //console.log(error)
                res.send(JSON.stringify({ signupSuccess: false, scLoginSuccess: true, scCookiesValid: true, userCreated: false, error: "user could not be created", userData: null}));
                reject(error)
                
            });
            
        })
    }
              
        // run the promises!
    tryScLogin()
        .then(data => validateScCookies(data))
        .then(data => createUser(data))
        .then(data => {
            console.log("**logged commenters to DB**");
            console.log("**sending data to browser**");
            res.send(JSON.stringify({ signupSuccess: false, scLoginSuccess: true, scCookiesValid: true, userCreated: true, error: null, userData: data}));
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
                            res.send(JSON.stringify({loginSuccess: false, userFound: false, scCookiesValid: null, loginError: "user not valid", userData: null}));
                            reject('user not found')
                        
                        } else if (!user.validPassword(req.body.scPassword)) {
                            
                            console.log('password not valid')
                            res.send(JSON.stringify({loginSuccess: false, userFound: false, scCookiesValid: null, loginError: "password not valid", userData: null}));
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
                
                utils.validateScCookies(user.scCookies)
                .then(data => {
                    //console.log(data)
                    resolve(user)
                })
                .catch(error => {
                    //console.log(error)
                    console.log(error)
                    reject("sc cookies not valid")
                    res.send(JSON.stringify({loginSuccess: false, userFound: true, scCookiesValid: false, loginError: "cookies not valid", userData: null}));
                    
                })
            
            });
                           
        }
        
        
        // run the promises!
        retrieveUser()
        .then(user => validateScCookies(user))
        .then(user => {
            req.session.user = user;
            res.send(JSON.stringify({loginSuccess: true, userFound: true, scCookiesValid: true, loginError: null, userData: req.session.user}));
        })
        .catch(error => {
            console.log(error);
          
        })
        
});



app.get('/commenters/', function(req, res) {
    
    console.log('GET /commenters/');

    let validateCommentersSearchUrl = () => {
        
        return new Promise((resolve, reject) => {
            
            let searchUrl = decodeURI(req.query.searchUrl);
    
            if (!searchUrl.includes("soundcloud")) {
                reject("Search URL does not contain 'soundcloud'");
                //res.send(JSON.stringify({errorMessage : "Server says: could not get commenters!"}))
            } else {
                resolve(searchUrl);
            }
        })
        
    }
    
    /*let getPasswordPlain = () => {
        
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
                });
            
            })
        }
    */
    
    let scrapeCommenters = (searchUrl) => {
            
        return new Promise((resolve, reject) => {
            
        CommenterScraper
        .scrapeCommenters(searchUrl, req.session.user.scCookies)
          .then(data => {
            //console.log(data)
            resolve(data)
          })
          .catch(error => reject(error))
         })
    }
        
           
        // run the promises!
        validateCommentersSearchUrl()
        .then(data => scrapeCommenters(data))
        .then(data => MessageModel.checkCommenterMessageStatus(data))
        .then(data => {
            console.log(data)
            console.log("**logged commenters to DB**");
            CommenterModel.logCommenters(data);
            console.log("**sending data to browser**");
            //console.log(JSON.stringify(data))
            res.send({success: true, noResults: false, commenterData: data})
        })
        .catch(error => {
          console.log(error);
          console.log(error.error);
            emptyArr = [];
            if (error.error == "no commenters") {
                //console.log('yes');
                 res.send({success: false, noResults: true, commenterData: "no commenters"})
            } else {
                 res.send({success: false, noResults: false, commenterData: null})
            }
        })
        
    
})
        
        
app.get('/followers/', function(req, res) {
    
    console.log('GET /followers/');

    
    let validateFollowersSearchUrl = () => {
        
        return new Promise((resolve, reject) => {
            
            let searchUrl = decodeURI(req.query.searchUrl);
            console.log(searchUrl);
            
            if (!searchUrl.includes("soundcloud")) {
                reject("Search URL does not contain 'soundcloud'");
                //res.send(JSON.stringify({errorMessage : "Server says: could not get followers!"}))
            } else {
                resolve(searchUrl);
            }
        })
        
    }
    
    /*let getPasswordPlain = () => {
        
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
                });
            
            })
        }
    */
    
    let scrapeFollowers = (searchUrl) => {
            
        return new Promise((resolve, reject) => {
            
        FollowerScraper
        .scrapeFollowers(searchUrl, req.session.user.scCookies)
          .then(data => {
            //console.log(data)
            resolve(data)
          })
          .catch(error => reject(error))
         })
    }
        
           
        // run the promises!
        validateFollowersSearchUrl()
        .then(data => scrapeFollowers(data))
        .then(data => MessageModel.checkFollowerMessageStatus(data))
        .then(data => {
            console.log(data)
            console.log("**logged followers to DB**");
            //FollowerModel.logFollowers(data);
            console.log("**sending data to browser**");
            //console.log(JSON.stringify(data))
            res.send({success: true, noResults: false, followerData: data})
        })
        .catch(error => {
          console.log(error);
          console.log(error.error);
            emptyArr = [];
            if (error.error == "no followers") {
                //console.log('yes');
                    res.send({success: false, noResults: true, followerData: "no commenters"})
            } else {
                    res.send({success: false, noResults: false, followerData: null})
            }
        })
        
    
})
    

app.post('/message/', function(req, res) {
    
    console.log('POST /message/');
  
    //console.log(req.body);
    
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
                                  decodeURI(req.body.searchUrl))
              .then(data => {
                //console.log(data)
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
            console.log("**logging message result to db**");
            MessageModel.logMessages(data);
            console.log("**sending message result data to browser**");
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


var server = app.listen(3002,() => {
  console.log("Started on PORT 3002")
})

server.setTimeout(900000);