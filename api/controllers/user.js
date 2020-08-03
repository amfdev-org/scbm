const db = require('../database')
const Op = db.Op;
const UserModel = require('../models/user')

module.exports.updateUser = (req, res) => {
    
    console.log('POST /user/');
    console.log(req.headers);
    console.log('POST /user/ req.body.userSettings:');
    console.log(req.body.userSettings);
    
    let validateHeaders = () => {
        
        return new Promise((resolve, reject) => {
            
            if (req.headers['origin'] !== 'https://scbm.amfdev.co.uk') {
                   console.log('ERROR! origin is not https://scbm.amfdev.co.uk')
                    reject('forbidden')
                    res.sendStatus(403)
        
            } else if (req.headers['x-request-app'] !== 'scbm') {
                   console.log('ERROR! x-request-app header not validated')
                    reject('forbidden')
                    res.sendStatus(403)  
                
            } else {
                console.log('origin and x-request-app header are validated');
                resolve()
            }
            
        })
    
     }
     
    let validateSession = () => {
        
        return new Promise((resolve, reject) => {
            
            if (req.session.user && req.cookies.scbm_sid) {
                console.log('authd - req.sesssion.user && req.cookies.scbm_sid are valid')
                resolve()
            } else {
                console.log('not authd - req.sesssion.user && req.cookies.scbm_sid are invalid')
             
                //res.send(JSON.stringify({authResult: false}));
                res.send({userUpdateSuccess: false})
                reject('session invalid')
            }
        
        });
                       
    }
    
         
    let updateUser = () => {
       
       console.log('POST /user/ updateUser function called');
       return new Promise((resolve, reject) => {
            console.log('POST /user/ updateUser promise opened, querying users with req.session.user.scUsername');
           UserModel.findOne({ where: { scUsername: req.session.user.scUsername } })
               .then(function (user) {
                   
               if (user) {
                     console.log('POST /user/ updateUser - query result - user '+ req.session.user.scUsername+' found');
                    user.update({
                        userSettings: JSON.stringify(req.body.userSettings)
                    })
                    .then(function() {
                           console.log('POST /user/ updateUser user settings updated: '+JSON.stringify(req.body.userSettings))
                           req.session.user = user.dataValues;
                           res.send({ userUpdateSuccess: true });
                    })
                    
               } else {
                 console.log('ERROR! POST /user/ updateUser - query result - user '+ req.session.user.scUsername+' not found!');
                   
               }
               
            }).catch(error => {
               console.log(error)
               console.log('ERROR! user settings not updated')
               res.send({userUpdateSuccess: false})
            });
           
       });
    
    }
    
        // run the promises!
        validateHeaders()
        .then(data => validateSession())
        .then(data => updateUser())
        .catch(e => {
          console.log(e);
          //res.send({userUpdateSuccess: false})
        })
    
    
    
}