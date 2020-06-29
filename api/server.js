const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const commenterScraper = require('./scrapeCommenters')
const login = require('./login')
const loadTest = require('./loadTest')

app.get('/test/', (req, res) => {
    
    console.log('test GET query');
                     
    var query = Object.keys(req.query); 
    
    const doLoadTest = new Promise((resolve, reject) => {
    loadTest
    .doLoadTest("https://"+query)
      .then(result => {
        resolve(result)
        //console.log(result);
          res.sendFile('/var/www/vhosts/scbm/api/test-screenshot.png');
      })
      .catch(err => res.status(500).send(err))
     })
    
})


app.get('/', (req, res) => {
    
    console.log('GET request'); 
    
    const doLogin = new Promise((resolve, reject) => {
    login
    .doLogin(req.query)
      .then(result => {
        resolve(result)
        console.log(result);
          res.sendFile('/var/www/vhosts/scbm/api/screenshot.png');
      })
      .catch(err => res.status(500).send(err))
     })
    
})


app.post('/', function(req, res) {
    
    console.log('POST request');
    
    const fetchCommenters = new Promise((resolve, reject) => {
    commenterScraper
    .scrapeCommenters(req.body.url)
      .then(commenters => {
        resolve(commenters)
      })
      .catch(err => reject('Commenters scrape failed'))
     })
    

    Promise.all([fetchCommenters])
    .then(commenters => {
        console.log(commenters[0]);
        res.send(JSON.stringify(commenters[0]));
    })
    .catch(err => res.status(500).send(err))
    
    //console.log(commenters);
    //res.send(JSON.stringify(commenters));
    
    
})


app.listen(3002,() => {
  console.log("Started on PORT 3002");
})