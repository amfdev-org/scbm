const fs = require('fs').promises;
const path = require('path');
const utils = require('./utils');    
const connection = require('./connection')
//const ProxyChain = require('proxy-chain');
//const randomUseragent = require('random-useragent');

   const sendMessageOnProfile = async (scUsername, scPasswordPlain, commenters, message, searchUrl) => {
      
      await console.log(scUsername);  
      await console.log(scPasswordPlain);
            
      let sendMessageResult = [];
      
      //instantiate puppeteer, browser and page
      const browser = await connection.puppeteer.launch(connection.options);
      const page = await browser.newPage();
      //await page.setExtraHTTPHeaders(headers);
      //await page.setDefaultNavigationTimeout(0);
      await console.log("**browser and page instantiated**");
      
      
      // evaluate document + apply stealth preoad
      await page.evaluateOnNewDocument(connection.preload, connection.device);
      await console.log("**document evaluated + stealth preload applied**");
  
      //try to load cookies
       try {
           const cookiesString = await fs.readFile(utils.userDataPath + '/cookies.json');
           const cookies = JSON.parse(cookiesString);
           await page.setCookie(...cookies);
           await console.log("**cookies loaded**");
       } catch(error) {
           await console.log("ERROR! cookies could not be loaded");
           return Promise.reject(new Error("ERROR! cookies could not be loaded"));
       }
       
      
      for (const commenter of commenters) {
         
            const randomWait = Math.floor((Math.random() * 1000) + 3)
         

            let profileUrl = commenter.profileUrl;
            await console.log("**iterating array: profile " + profileUrl);
                   
            //try to load the profile page
            try {
               await page.goto(profileUrl, {waitUntil: 'networkidle0'});
               await console.log('**navigated to: ' + profileUrl);
            } catch(error) {
               await console.log('ERROR! could not navigate to url ' + profileUrl);
               sendMessageResult.push({profileUrl : profileUrl,
                                      message: message,
                                      searchUrl: searchUrl,
                                      messageResult: "Error"});
               continue;
               //return Promise.reject(new Error('ERROR! could not navigate to url ' + profileUrl));
            }
            
            await page.waitFor(utils.randomWait);
            /*
            
            //check for the open message form button, if this is missing, log in failed
            //TO DO - if failed here, do login
            await page.waitForSelector('.sc-button-message')
            .catch ((error) => {
              console.log('ERROR! could not access send message button!');
              sendMessageResult.push({messageFailed : profileUrl});
              continue;
              //return;
            })
            
            //try to click open message form button
            try {
               await page.click('.sc-button-message');
               await console.log('**open message form button clicked**');
            } catch(error) {
               await console.log('ERROR! could not click open message form button!');
               sendMessageResult.push({messageFailed : profileUrl});
               continue;
               //return;
            }
            
            await page.waitFor(utils.randomWait3);
            
            //check for the message textarea
            await page.waitForSelector('.textfield__inputWrapper > textarea')
            .catch ((error) => {
              console.log('ERROR! could not access message textarea!');
              sendMessageResult.push({messageFailed : profileUrl});
               continue;
               //return;
            })
            
            
            const textarea = await page.$('.textfield__inputWrapper > textarea');
            
            //try to fill out the password
            try {
               await textarea.type(message, {delay: utils.randomWait4});
               await console.log('**message entered**');
            } catch (error) {
               await console.log("ERROR! could not enter message!");
               sendMessageResult.push({messageFailed : profileUrl});
               continue;
               //return;
            }
            
            await page.waitFor(utils.randomWait4);
            
            //try to send the message!
            try {
               await page.click('.composeMessage__sendButton');
               await console.log('**Message sent to ' + profileUrl);
            } catch(error) {
               await console.log('ERROR! could not send message to ' + profileUrl);
               sendMessageResult.push({messageFailed : profileUrl});
               continue;
               //return;
            }
            
            await page.waitFor(utils.randomWaitLong);
            
            //try to take the final screenshot
            try {
               await page.screenshot({path: utils.screenshotPath + '/screenshot.png'});
               await console.log('**screenshot saved**');
            } catch(error) {
               await console.log('ERROR! screenshot could not be saved!');
            }
            */
         
         
            sendMessageResult.push({profileUrl : profileUrl,
                                      message: message,
                                      searchUrl: searchUrl,
                                      messageResult: "Success"});
         
      }// end of for loop
      
      //console.log(sendMessageResult);
      
      //close the browser
      await browser.close();
      
      return sendMessageResult;

    }



module.exports = { sendMessageOnProfile }