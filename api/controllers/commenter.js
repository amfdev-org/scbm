const db = require('../database')
const Op = db.Op;

const utils = require('../utils')
const CommenterScraper = require('../scrapers/commenter')
const CommenterModel = require('../models/commenter')
const SearchModel = require('../models/search')
const MessageModel = require('../models/message')

module.exports.getCommenters = (req, res) => {
    
    if (!req.session.user) {
        console.log('no session')
        res.end();
    }
    
    console.log('GET /commenters/');

    let validateCommentersSearchUrl = () => {
        
        return new Promise((resolve, reject) => {
            
            let searchUrl = decodeURI(req.query.searchUrl).replace(/\/$/, "");
    
            if (!searchUrl.includes("soundcloud")) {
                reject("Search URL does not contain 'soundcloud'");
                //res.send(JSON.stringify({errorMessage : "Server says: could not get commenters!"}))
            } else if (searchUrl.split("/").length - 1 < 4 ) {
                 console.log("Song search URL looks like a Profile URL")
                reject("Song search URL looks like a Profile URL");
                //res.send(JSON.stringify({errorMessage : "Server says: could not get followers!"}))
            } else {
                
                resolve({searchUrl: searchUrl});
            }
        })
        
    }
    
    let logSearchToDb = (data) => {
        
        return new Promise((resolve, reject) => {
            
                SearchModel.Search.create({search: data.searchUrl,
                                   type: "commenter",
                                   user: req.session.user.scUsername
                                   })
                .then(function(search) {
                    resolve({searchUrl: data.searchUrl});
                })
                .catch(error => {
                   console.log(error)
                   reject(error)
                });
                
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
        .then(data => logSearchToDb(data))
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
        
}