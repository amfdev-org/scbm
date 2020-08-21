const utils = require('../utils')
const UserModel = require('../models/user')


module.exports.postLogin = (req, res) => {
    
    console.log('POST /login/');
        
        let retrieveUser = () => {
            
            return new Promise((resolve, reject) => {
                
                UserModel.User.findOne({ where: { scUsername: req.body.scUsername } })
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
          
        });
        
}


module.exports.getLogout = (req, res) => {
    
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
    
}