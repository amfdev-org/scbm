const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const utils = require('./scrapers/utils')
const CommenterScraper = require('./scrapers/scrapeCommenters')
const login = require('./scrapers/login')
const loadTest = require('./scrapers/loadTest')

const db = require('./database')
const CommenterModel = require('./models/commenter')

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
    
    const doLoadTest = new Promise((resolve, reject) => {
    loadTest
    .doLoadTest("https://"+url, false)
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
    
    const doLoadTestSc = new Promise((resolve, reject) => {
    loadTest
    .doLoadTestSc("https://soundcloud.com")
      .then(result => {
        resolve(result)
        //console.log(result);
          res.sendFile(utils.screenshotPath + '/screenshot.png');
      })
      .catch(err => res.status(500).send(err))
     })
    
})


app.get('/', (req, res) => {
    
    console.log('GET request'); 
    
    const doLogin = new Promise((resolve, reject) => {
    login
    .doLogin("https://soundcloud.com/signin")
      .then(result => {
        resolve(result)
        console.log(result);
          res.sendFile(utils.screenshotPath + '/screenshot.png');
      })
      .catch(err => res.status(500).send(err))
     })
    
})*/


app.get('/commenters/', function(req, res) {
    
    console.log('GET /commenters/');
    
    let searchUrl = decodeURI(req.query.searchUrl);
    
    let scrapeCommenters = () => {
        
        return new Promise((resolve, reject) => {
            
        CommenterScraper
        .scrapeCommenters(searchUrl)
          .then(data => {
            //console.log(data)
            resolve(data)
          })
          .catch(err => reject('Commenters scrape failed'))
         })
    }
    
        scrapeCommenters()
        .then(data => CommenterModel.checkCommenterMessageStatus(data))
        .then(data =>{
          console.log(data)
          res.send(JSON.stringify(data))
        })
        .catch(e => {
          console.log(e)
          res.send(JSON.stringify({errorMessage : "commenters scraped failed"}))
        })
    
})


app.get('/message/send/', function(req, res) {
    
    console.log('GET /message/send/');
            
    
    /*
    const dataArray = [
        { profileUrl: 'https://soundcloud.com/ocmoon' },
        { profileUrl: 'https://soundcloud.com/fogcapture' },
        { profileUrl: 'https://soundcloud.com/patrickxtaylor' }
      ];
    
    const Commenter = 
    commenterModel.bulkCreate(dataArray, { updateOnDuplicate: ["lastSearchedSongUrl",
                                                               "lastMessaged",
                                                               "messageIds",
                                                               "createdAt",
                                                               "updatedAt"]})
    .then(commenter => {
        console.log(commenter);
        // you can now access the newly ChatMessage task via the variable message
    }).catch(err => {
        console.log(err)
    })
    
    */
  
})


var server = app.listen(3002,() => {
  console.log("Started on PORT 3002");
})

server.setTimeout(900000);