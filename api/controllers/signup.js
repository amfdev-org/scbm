const utils = require('../utils')
const sanitize = require("sanitize-filename");
const UserModel = require('../models/user')
const LoginScraper = require('../scrapers/login')

module.exports.postSignup = (req, res) => {
    
    console.log('POST /signup/');
    
    //console.log(sanitizedUsername);
    //console.log(req.headers)
    
     let validateHeaders = () => {
        
        return new Promise((resolve, reject) => {
            
            if (req.headers['origin'] !== utils.baseUrl) {
                   console.log('ERROR! origin is not ' +utils.baseUrl)
                    reject('forbidden')
                    res.sendStatus(403)
        
            } else if (req.headers['x-request-app'] !== 'scbm') {
                   console.log('ERROR! x-request-app header not validated')
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
                scProfile: data.scProfile,
                userSettings: JSON.stringify({"isTestMode":"true"})
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
        
}