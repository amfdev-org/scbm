const fs = require('fs');
const path = require('path');
const utils = require('./utils');    
const connection = require('./connection')
//const ProxyChain = require('proxy-chain');
//const randomUseragent = require('random-useragent');

const util = require('util');
const log_file = fs.createWriteStream(utils.logPath + '/debug.log', {flags : 'a'});
const log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

   const sendMessageOnProfile = async (scCookies, commenters, message, searchUrl, sender) => {
            
      let sendMessageResult = [];
      
      //instantiate puppeteer, browser and page
      const browser = await connection.puppeteer.launch(connection.options);
      const page = await browser.newPage();
      //await page.setExtraHTTPHeaders(headers);
      await page.setDefaultNavigationTimeout(0);
      await console.log("**browser and page instantiated**");
      
      
      // evaluate document + apply stealth preoad
      await page.evaluateOnNewDocument(connection.preload, connection.device);
      await console.log("**document evaluated + stealth preload applied**");
  
      //try to load cookies
       try {
           const cookiesString = await fs.readFileSync(utils.userDataPath +  '/' + scCookies);
           const cookies = JSON.parse(cookiesString);
           await page.setCookie(...cookies);
           await console.log("**cookies loaded**");
       } catch(error) {
           await console.log(error);
           return Promise.reject(new Error("ERROR! cookies could not be loaded - "+scCookies));
       }
       
      let i = 0;
      //for(i = 0; i < commenters.length; i++) {
      for (const commenter of commenters) {
         
            const randomWaitShort = Math.floor((Math.random() * 100) + 3)
            await console.log('randomWaitShort '+randomWaitShort);
            
            const randomWaitLong = Math.floor((Math.random() * 1000) + 876)

            let profileUrl = commenter.profileUrl;
            let profileName = commenter.profileName;
            let messageWithName = message.replace("<<profileName>>", profileName);
            await console.log("**iterating array: profile " + profileUrl);
          
            //try to load the profile page
            try {
               await page.goto(profileUrl, {waitUntil: 'networkidle0'});
               await console.log('**navigated to: ' + profileUrl);
            } catch(error) {
               await console.log('ERROR! could not navigate to url ' + profileUrl);
               console.log(error)
                        sendMessageResult.push({profileUrl : profileUrl,
                                               profileName: profileName,
                                      message: messageWithName,
                                      searchUrl: searchUrl,
                                      sender: sender,
                                      messageResult: "Failure"});
               continue;
               //return Promise.reject(new Error('ERROR! could not navigate to url ' + profileUrl));
            }
               
            //await page.waitFor(randomWaitLong);
            
            try {
               await page.screenshot({path: utils.screenshotPath + '/message/screenshot-after-navigate.png'});
               await console.log('**screenshot saved**');
            } catch(error) {
               console.log(error)
               await console.log('ERROR! screenshot could not be saved!');
            }
    
            //check for the open message form button, if this is missing, log in failed
            //TO DO - if failed here, do login
            /*await page.waitForSelector('.sc-button-message')
            .then(() => console.log('**got send message button'))
            .catch ((error) => {
              console.log('ERROR! could not access send message button!');
              console.log(error)

                sendMessageResult.push({profileUrl : profileUrl,
                                      message: messageWithName,
                                      searchUrl: searchUrl,
                                      messageResult: "Failure"});
              continue;
              //return;
            })*/
            
            try {
               await page.waitForSelector('.sc-button-message')
               await console.log('**got send message button')
            } catch(error) {
                  console.log('ERROR! could not access send message button!');

                  sendMessageResult.push({profileUrl : profileUrl,
                                         profileName: profileName,
                                        message: messageWithName,
                                        searchUrl: searchUrl,
                                        sender: sender,
                                        messageResult: "Failure"});
                  
                  continue;
            }

            //await page.waitFor(randomWaitLong);
            
            //try to click open message form button
            try {
               await page.click('.sc-button-message');
               await console.log('**open message form button clicked**');
            } catch(error) {
               await console.log('ERROR! could not click open message form button!');
                console.log(error)
                          sendMessageResult.push({profileUrl : profileUrl,
                                                 profileName: profileName,
                                      message: messageWithName,
                                      searchUrl: searchUrl,
                                      sender: sender,
                                      messageResult: "Failure"});
               continue;
               //return;
            }
            
            try {
               await page.screenshot({path: utils.screenshotPath + '/message/screenshot-after-click-open-messages.png'});
               await console.log('**screenshot saved**');
            } catch(error) {
               console.log(error)
               await console.log('ERROR! screenshot could not be saved!');
            }
            
            
            //await page.waitFor(randomWait);            
            //try {
            //   await page.screenshot({path: utils.screenshotPath + '/screenshot-error.png'});
            //   await console.log('**screenshot saved**');
            //} catch(error) {
            //   console.log(error)
             //  await console.log('ERROR! screenshot could not be saved!');
            //}
            
            //const html = await page.content();
            //await console.log(html);
        
            //check for the message textarea
            /*await page.waitForSelector('.textfield__inputWrapper > textarea66')
            .then(() => console.log('**got message textarea'))
            .catch ((error) => {
             console.log('ERROR! could not access message textarea!');
               console.log(error)
                         sendMessageResult.push({profileUrl : profileUrl,
                                      message: messageWithName,
                                      searchUrl: searchUrl,
                                      messageResult: "Failure"});
               continue;
               //return;
            })*/
            
            //DISMISS MODAL
   
            try {
              let messageFrame = await page.frames().find(frame => frame.name().includes('sp_message_iframe'));
               await console.log('got message popup / iframe')
               await messageFrame.waitForSelector('div.message-component > button.message-button');
               await console.log('**got message-component button in frame')
               await messageFrame.click('div.message-component > button.message-button');
               await console.log('**clicked modal dismiss')
            } catch(error) {
               await console.log('ERROR! could not dismiss message popup / iframe!!')
            }
               
        
            try {
               await page.screenshot({path: utils.screenshotPath + '/message/screenshot-after-dismiss-modal.png'});
               await console.log('**screenshot saved**');
            } catch(error) {
               console.log(error)
               await console.log('ERROR! screenshot could not be saved!');
            }
            
            
            try {
               await page.waitForSelector('.textfield__inputWrapper > textarea')
               await console.log('**got message textarea')
            } catch(error) {
                    console.log('ERROR! could not access message textarea!');

                     sendMessageResult.push({profileUrl : profileUrl,
                                            profileName: profileName,
                                  message: messageWithName,
                                  searchUrl: searchUrl,
                                  sender: sender,
                                  messageResult: "Failure"});
               continue;
            }
            
            //await page.waitFor(randomWaitLong);
            
            const textarea = await page.$('.textfield__inputWrapper > textarea');
            
            //try to fill out the message!
            try {
               //await textarea.type(messageWithName, {delay: randomWaitShort}); // WITH DELAY IF NEEDED
               await textarea.type(messageWithName);
               await console.log('**message entered**');
            } catch (error) {
               await console.log("ERROR! could not enter message!");
                console.log(error)
                         sendMessageResult.push({profileUrl : profileUrl,
                                                profileName: profileName,
                                      message: messageWithName,
                                      searchUrl: searchUrl,
                                      sender: sender,
                                      messageResult: "Failure"});
               continue;
               //return;
            }
            
            try {
               await page.screenshot({path: utils.screenshotPath + '/message/screenshot-after-message-enter.png'});
               await console.log('**screenshot saved**');
            } catch(error) {
               console.log(error)
               await console.log('ERROR! screenshot could not be saved!');
            }
            
            //await page.waitFor(randomWaitShort);
            
   
            //try to send the message!
            /*try {
               await page.click('.composeMessage__sendButton');
               await console.log('**Message sent to ' + profileUrl);
            } catch(error) {
               await console.log('ERROR! could not send message to ' + profileUrl);
                          sendMessageResult.push({profileUrl : profileUrl,
                                      message: messageWithName,
                                      searchUrl: searchUrl,
                                      sender: sender,
                                      messageResult: "Failure"});
               continue;
               //return;
            }*/
            
            //await page.waitFor(randomWaitLong);          
                      
            try {
               await page.screenshot({path: utils.screenshotPath + '/message/screenshot-after-message-send.png'});
               await console.log('**screenshot saved**');
            } catch(error) {
               console.log(error)
               await console.log('ERROR! screenshot could not be saved!');
            }
    
         
            sendMessageResult.push({profileUrl : profileUrl,
                                   profileName: profileName,
                                      message: messageWithName,
                                      searchUrl: searchUrl,
                                      sender: sender,
                                      messageResult: "Success"});
            
            i++;
         
      }// end of for loop
      
      //console.log(sendMessageResult);
      
      //close the browser
      await browser.close();
      
      return sendMessageResult;

    }



module.exports = { sendMessageOnProfile }