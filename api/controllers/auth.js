const utils = require('../utils')
const UserModel = require('../models/user')

module.exports.getAuth = (req, res) => {
    
    console.log('GET /auth/');
    //console.log(req.session);
    
    let validateHeaders = () => {
        
        return new Promise((resolve, reject) => {
                            
             if (req.headers['x-request-app'] !== 'scbm') {
                   console.log('ERROR! x-request-app header not validated')
                    reject('forbidden')
                    res.sendStatus(403)  
                
            } else {
                console.log('x-request-app header validated')
                resolve()
            }
            
        })
    
     }
     
    let validateSession = () => {
        
        return new Promise((resolve, reject) => {
            
            if (req.session.user && req.cookies[utils.expressSessionName]) {
                console.log('authd - req.sesssion.user && req.cookies.scbm_sid are valid')
                resolve(true)
            } else {
                console.log('not authd - req.sesssion.user && req.cookies.scbm_sid are invalid')
             
                //res.send(JSON.stringify({authResult: false}));
                res.send(JSON.stringify({
                    authSuccess: false,
                    sessionValid: false,
                    scCookiesValid: null,
                    authError: "session invalid",
                    userData: null
                    }));
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
    
    let retrieveUser = () => {
            
            return new Promise((resolve, reject) => {
                
                UserModel.User.findOne({ where: { scUsername: req.session.user.scUsername } })
                    .then(function (user) {
                        
                    if (!user) {
                        
                            console.log('user not found')
                            //res.send({ loginSuccess: false, userFound: false, scCookiesValid: null, loginError: "user not valid", userData: null });
                            reject('user not found')
                        
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
        
    // run the promises!
    validateHeaders()
        .then(data => validateSession())
        .then(data => validateScCookies())
        .then(data => retrieveUser())
        .then(data => {
            res.send(JSON.stringify({
                authSuccess: true,
                sessionValid: true,
                scCookiesValid: true,
                authError: null,
                userData: data
                }));
        })
        .catch(error => {
                 
          console.log(error);

        })
                
}
