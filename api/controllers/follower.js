const db = require('../database')
const Op = db.Op;

const utils = require('../utils')
const FollowerScraper = require('../scrapers/follower')
const FollowerModel = require('../models/follower')
const MessageModel = require('../models/message')
const SearchModel = require('../models/search')

module.exports.getFollowers = (req, res) => {
    
    console.log('GET /followers/');
    
    if (!req.session.user) {
        console.log('no session')
        res.end();
    }
    
    console.log(req.query)
    console.log(req.session.user.scProfile)
    //console.log(req.session.user)
     
    let validateFollowersSearchUrl = () => {
        
        return new Promise((resolve, reject) => {
            
            //remove trailing slash if preset
            let searchUrl = decodeURI(req.query.searchUrl).replace(/\/$/, "");
            console.log('search url ' + searchUrl)
            let isMyFollowersSearch = false;

            if (!searchUrl.includes("soundcloud")) {
                 console.log("Search URL does not contain 'soundcloud'")
                reject("Profile Search URL does not contain 'soundcloud'");
                //res.send(JSON.stringify({errorMessage : "Server says: could not get followers!"}))
            } else if (searchUrl.split("/").length - 1 > 3 ) {
                 console.log("Profile Search URL looks like a Song URL")
                reject("Profile Search URL looks like a Song URL");
                //res.send(JSON.stringify({errorMessage : "Server says: could not get followers!"}))
            } else if (searchUrl === req.session.user.scProfile || searchUrl === "https://soundcloud.com") {
                console.log('is my follower search')
                //console.log(isMyFollowersSearch)
                resolve({searchUrl: req.session.user.scProfile, isMyFollowersSearch: true});
            } else {  
                //console.log('is my follower search')
                //console.log(isMyFollowersSearch)
                resolve({searchUrl: searchUrl, isMyFollowersSearch: false});
            }
        })
        
    }
    
    
        let logSearchToDb = (data) => {
        
        return new Promise((resolve, reject) => {
        
                SearchModel.Search.create({search: data.searchUrl,
                                   type: "follower",
                                   user: req.session.user.scUsername
                                   })
                .then(function(search) {
                    console.log('logSearchToDb result')
                    //console.log(search)
                    resolve({searchUrl: data.searchUrl});
                })
                .catch(error => {
                   console.log(error)
                   reject(error)
                });
                
            })
        
    }
    
    hasRecentLoggedFollowers = false;
      let checkForLoggedFollowers = (data) => {
        
        return new Promise((resolve, reject) => {
            console.log("checkForLoggedFollowers")
            
            if (data.isMyFollowersSearch) {
                var cutoff = 'NOW() - INTERVAL 12 HOUR';
            } else {
                var cutoff = 'NOW() - INTERVAL 1 MONTH';
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
        .then(data => logSearchToDb(data))
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
        
}