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

const db = require('./database')
const CommenterModel = require('./models/commenter')
const MessageModel = require('./models/message')
const UserModel = require('./models/user')

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


app.get('/sc-login-test/', (req, res) => {
  
    if(!req.session.scCookies) {
      //needs to do a login
    }
    
    const sanitizedUsername = sanitize(req.session.user.scUsername);
    //console.log(sanitizedUsername);
    
    const doLogin = new Promise((resolve, reject) => {
    LoginScraper
    .login("https://soundcloud.com/signin", sanitizedUsername)
      .then(result => {
        resolve(result)
        console.log(result);
        //res.sendFile(utils.screenshotPath + '/screenshot.png');
      })
      .catch(err => res.status(500).send(err))
     })
    
    
        
})


app.get('/cookie/', (req, res) => {

       console.log('GET /cookie/');
       const cookiesString = fs.readFileSync(utils.userDataPath + '/cookies.json');
       const cookies = JSON.parse(cookiesString);
       //console.log(cookies);
       
       for(const cookie of cookies) {
        
        //console.log(cookie);
            let cookieExpiry = moment.unix(cookie.expires);
            if (cookie.secure) {
                if(cookieExpiry.isAfter()) {
                    console.log(cookie.name + cookieExpiry.format("MM/DD/YYYY"));
                } else {
                    //console.log(cookie.name + cookieExpiry.format("MM/DD/YYYY"));
                }
            }
        
        //login cookies: connect_session, oauth_token
       }

})


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
    
    if (req.session.user && req.cookies.scbm_sid) {
        console.log('auth - req.sesssion.user && req.cookies.scbm_sid are true')
        res.send(JSON.stringify({authResult: true, userData: req.session.user}));
    } else {
        console.log('no auth - req.sesssion.user && req.cookies.scbm_sid are not true')
        res.send(JSON.stringify({authResult: false}));
    }
    
})


app.post('/signup/', (req, res) => {
    
    console.log('POST /signup/');
    
    res.send(JSON.stringify(req.body));
    
       UserModel.create({
            scUsername: req.body.username,
            scPassword: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            console.log(user.dataValues);
        })
        .catch(error => {
            //res.redirect('/signup');
            console.log(error)
        });
    
});

app.post('/login/', (req, res) => {
    
        console.log('POST /login/');

        //console.log(req.body);
        
        if (!req.body.isSignup) {
    
            UserModel.findOne({ where: { scUsername: req.body.scUsername } })
            .then(function (user) {
                if (!user) {
                console.log('user not found')
                res.send(JSON.stringify({loginResult : "error",
                                            loginResultReason: "user not found"
                                            }))
                } else if (!user.validPassword(req.body.scPassword)) {
                    console.log('password not valid')
                     res.send(JSON.stringify({loginResult: "error", loginResultReason : "user not found"}))
                } else {
                    req.session.user = user.dataValues;
                    //console.log(user.dataValues)
                    res.send(JSON.stringify({loginResult: "success", loginResultReason : "user found", userData: req.session.user}))
                    //res.send(JSON.stringify({loginSuccess: user.dataValues}));
                }
            });
            
        } else {
                
            UserModel.create({
                scUsername: req.body.scUsername,
                scPassword: req.body.scPassword
            })
            .then(user => {
                req.session.user = user.dataValues;
                //console.log(user.dataValues);
                res.send(JSON.stringify({loginResult: "success", loginResultReason : "user created", userData: req.session.user}))
            })
            .catch(error => {
                //res.redirect('/signup');
                console.log(error)
                res.send(JSON.stringify({loginResult: "error", loginResultReason : "user could not be created", userData: req.session.user}))
            });
        
        }
        
    });



app.get('/commenters/', function(req, res) {
    
    console.log('GET /commenters/');
    
let validateSearchUrl = () => {
        
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
                });
            
            })
        }
    
    
    let scrapeCommenters = (scPasswordPlain) => {
            
        return new Promise((resolve, reject) => {
            
        CommenterScraper
        .scrapeCommenters(req.session.user.scUsername, scPasswordPlain, decodeURI(req.query.searchUrl))
          .then(data => {
            //console.log(data)
            resolve(data)
          })
          .catch(err => reject("Server says: could not get commenters!"))
         })
    }
        
           
        // run the promises!
        validateSearchUrl()
        .then(data => getPasswordPlain())
        .then(scPasswordPlain => scrapeCommenters(scPasswordPlain))
        .then(data => MessageModel.checkCommenterMessageStatus(data))
        .then(data => {
            console.log("**logged commenters to DB**");
            CommenterModel.logCommenters(data);
            console.log("**sending data to browser**");
            res.send(JSON.stringify(data))
        })
        .catch(e => {
          console.log(e);
          res.send(JSON.stringify({errorMessage : "Server says: could not get commenters!"}))
        })
        
    
})
        
    

app.post('/message/', function(req, res) {
    
    console.log('POST /message/');
  
    //console.log(req.body);
    
        let validateMessage = () => {
           
           return new Promise((resolve, reject) => {
               
               let selectedCommenters = req.body.selectedCommenters;
               let message = req.body.message;
               let searchUrl = decodeURI(req.body.searchUrl);
       
               if (!searchUrl.includes("soundcloud")) {
                   reject("Search URL does not contain 'soundcloud'");
                   //res.send(JSON.stringify({errorMessage : "Server says: could not get commenters!"}))
               } else if (message.length < 10) {
                   reject("Message is not long enough");
                   //res.send(JSON.stringify({errorMessage : "Server says: could not get commenters!"}))
               } else if (selectedCommenters.length < 1) {
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
                    });
            
            })
        }
    
        let sendMessageOnProfile = (scPasswordPlain) => {
            
            return new Promise((resolve, reject) => {
                
            MessageScraper
            .sendMessageOnProfile(
                                  req.session.user.scUsername,
                                  scPasswordPlain,
                                  req.body.selectedCommenters,
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
        .then(data => getPasswordPlain())
        .then(scPasswordPlain => sendMessageOnProfile(scPasswordPlain))
        .then(data => {
          //console.log(data)
            console.log("**logging message result to db**");
            MessageModel.logMessages(data);
            console.log("**sending message result data to browser**");
            res.send(JSON.stringify(data))
        })
        .catch(e => {
          console.log(e);
          res.send(JSON.stringify({errorMessage : "Server says:  message send failed!"}))
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
    if (req.session.user && req.cookies.scbm_sid) {
        res.clearCookie('scbm_sid');
        res.send(JSON.stringify({logoutResult: "success"}))
    } else {
        res.send(JSON.stringify({logoutResult: "success"}))
    }
});


var server = app.listen(3002,() => {
  console.log("Started on PORT 3002");
})

server.setTimeout(900000);