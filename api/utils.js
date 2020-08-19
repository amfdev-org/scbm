const dotenv = require('dotenv').config();
const fs = require('fs').promises;
const moment = require('moment');

const runMode = process.env.RUN_MODE;
const rootPath = process.env.ROOT_PATH;
const apiPath = rootPath + "/api"
const screenshotPath = apiPath + "/screenshots";
const userDataPath = apiPath  + "/user_data";
const logPath = apiPath  + "/logs";
const baseUrl = process.env.BASE_URL;
const expressSessionName = process.env.EXPRESS_SESSION_NAME;

const randomWait1 = Math.floor((Math.random() * 1000) + 3);
const randomWait2 = Math.floor((Math.random() * 1000) + 4);
const randomWait3 = Math.floor((Math.random() * 1000) + 9);
const randomWait4 = Math.floor((Math.random() * 1000) + 11);
const randomWait5 = Math.floor((Math.random() * 1000) + 14);
const randomWait6 = Math.floor((Math.random() * 1000) + 15);
const randomWait7 = Math.floor((Math.random() * 1000) + 17);
const randomWait8 = Math.floor((Math.random() * 1000) + 18);
const randomWaitLong = Math.floor((Math.random() * 1000) + 1567);
const randomWaitVeryLong = Math.floor((Math.random() * 1000) + 3567);

const randomWaitShort1 = Math.floor((Math.random() * 100) + 3);
const randomWaitShort2 = Math.floor((Math.random() * 100) + 4);
const randomWaitShort3 = Math.floor((Math.random() * 100) + 9);
const randomWaitShort4 = Math.floor((Math.random() * 100) + 11);

    async function autoScrollDown(page) {
      
      await page.evaluate(async () => {
        
         await console.log('auto scroll down page evaluate')
         
          await new Promise((resolve, reject) => {
                  startT = new Date().getTime();
                  const distance = 100;
                  const delay = 400;
                  const timer = setInterval(() => {
                    now = new Date().getTime();
                    //console.log('diff' + now - startT)
                    document.scrollingElement.scrollBy(0, distance);
                    if ((document.scrollingElement.scrollTop + window.innerHeight >= document.scrollingElement.scrollHeight)
                        ||
                        ((now - startT) > 180000) //3 MIN LIMIT
                        ) {
                      clearInterval(timer);
                      resolve();
                    }
                  }, delay);
          });
      });
  
    }
    
    async function autoScrollDownElement(page) {
      
      await page.evaluate(async () => {

          await new Promise((resolve, reject) => {
            
            startT = new Date().getTime();              
            const distance = 100;
              const delay = 400;
              const timer = setInterval(() => {
                now = new Date().getTime();
                scrollableSection = document.querySelector('.g-scrollable-inner');
                scrollableSection.scrollBy(0, distance);
                //console.log(now - startT)
                if ((now - startT) > 5000) {
                  clearInterval(timer);
                   resolve();
                }
              }, delay);
              });
          });
  
    }
    
    async function autoScrollUp(page) {
        await page.evaluate(_ => {
        window.scrollTo(0, 0);
        });
    }
    
    
    async function joinObjects() {
      var idMap = {};
      // Iterate over arguments
      for(var i = 0; i < arguments.length; i++) { 
        // Iterate over individual argument arrays (aka json1, json2)
        for(var j = 0; j < arguments[i].length; j++) {
           var currentID = arguments[i][j]['idx'];
           if(!idMap[currentID]) {
              idMap[currentID] = {};
            }
           // Iterate over properties of objects in arrays (aka id, name, etc.)
          for(key in arguments[i][j]) {
              idMap[currentID][key] = arguments[i][j][key];
          }
        }
      }
    
      // push properties of idMap into an array
      var newArray = [];
      for(property in idMap) {
        newArray.push(idMap[property]);
      }
      return newArray;
    }


    async function validateScCookies(data) {
                
            try {
                const cookiesString = await fs.readFile(userDataPath + '/' + data.scCookies);
            } catch(error) {
                throw new Error(userDataPath + '/' + data.scCookies +  " not found");
            }
            
            const cookiesString = await fs.readFile(userDataPath + '/' + data.scCookies);
            
            try {
                const cookies = await JSON.parse(cookiesString);
            } catch(error) {
                throw new Error("Can not JSON.parse " + userDataPath + '/' + data.scCookies);
            }
            
            const cookies = await JSON.parse(cookiesString);
          
            //console.log(cookies);
            await moment.locale('gb');
            cookieNameArr = [];
            //let cookiesValid = false;
            for(const cookie of cookies) {
              
              cookieNameArr.push(cookie.name);
              
            }
            
            if (!cookieNameArr.includes('connect_session')) {
               throw new Error("Soundcloud connect_session not found");
            }
            
            if (!cookieNameArr.includes('oauth_token')) {
               throw new Error("Soundcloud oauth_token not found");
            }
            
            for(const cookie of cookies) {

                 let cookieExpiry = await moment.unix(cookie.expires);
                 let cookieExpiryDate = await cookieExpiry.format("DD/MM/YYYY");
                 
                 if (cookie.name === 'connect_session') {
                  
                      if (!cookie.domain.includes("soundcloud")) {
                           throw new Error("Soundcloud connect_session not found");
                      }
                   
                      if(!cookieExpiryDate === '31/12/1969') {
                          throw new Error("Soundcloud connect_session cookie expired")  
                      }
                    
                 } else if (cookie.name === 'oauth_token') {
                  
                      if (!cookie.domain.includes("soundcloud")) {
                        throw new Error("Soundcloud oauth_token not found");
                      }
                     
                      if(!cookieExpiry.isAfter()) {
                         throw new Error("Soundcloud oauth_token cookie expired")  
                      }
                 }
                 
            }
            
            return data;
  
    }
    
    
    async function getRandomLink(page) {
            // get all links on page 
        const getLinks = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a'))
            return links.map(link => link.href).slice(0, 9999)
        })
  
        //de-dupe links
        uniqueLinks = await Array.from(new Set(getLinks));
        
        //select link at random
        var randomLink = await uniqueLinks[Math.floor(Math.random()*uniqueLinks.length)];
        
        return randomLink;
    }


    async function saveCookies(page) {          
        const cookies = await page.cookies();
        //await console.log(cookies);
        await fs.writeFile(userDataPath +  '/cookies.json', JSON.stringify(cookies, null, 2));
    }


    async function loadCookies(page) {          
        const cookiesString = await fs.readFile(userDataPath + '/cookies.json');
        const cookies = JSON.parse(cookiesString);
        //await console.log(cookies);
        await page.setCookie(...cookies);
    }
    
    const getDownloadLogs = (req, res) => {
      
        if (req.session.user) {
            console.log('download logs')
            const file = logPath + "/debug.log";
            res.download(file); // Set disposition and send it.
        } else {
            console.log('forbidden')
            reject('forbidden')
            res.sendStatus(403) 
        }
    }
    
    const consoleLogToFile = (message) => {
      
        const fs = require('fs')
        const util = require('util');
        const log_file = fs.createWriteStream(logPath + '/debug.log', {flags : 'a'});
        const log_stdout = process.stdout;
        
        log_file.write(util.format(message) + '\n');
        log_stdout.write(util.format(message) + '\n');
    }
    
    module.exports = {
                runMode,
                rootPath,
                apiPath,
                screenshotPath,
                userDataPath,
                logPath,
                baseUrl,
                expressSessionName,
                randomWait1,
                randomWait2,
                randomWait3,
                randomWait4,
                randomWait5,
                randomWait6,
                randomWait7,
                randomWait8,
                randomWaitLong,
                randomWaitVeryLong,
                autoScrollDown,
                autoScrollUp,
                getRandomLink,
                saveCookies,
                validateScCookies,
                autoScrollDownElement,
                joinObjects,
                getDownloadLogs,
                consoleLogToFile
                };