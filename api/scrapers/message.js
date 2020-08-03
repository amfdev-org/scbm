const fs = require('fs');
const path = require('path');
const utils = require('../utils');    
const connection = require('./connection')
//const ProxyChain = require('proxy-chain');
//const randomUseragent = require('random-useragent');
const moment = require('moment')

   const sendMessageOnProfile = async (scCookies, recipients, message, sender, senderProfileUrl, messageType, isTestMode) => {
      
      //console.log(recipients)
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
       
      //let i = 0;
      for(i = 0; i < recipients.length; i++) {
      //for (const recipient of recipients) {
      
            const today = new Date();
            const offset = today.getTimezoneOffset();
            const localTime = moment(today).subtract(offset, 'minutes').toISOString();
      
            const randomWaitShort = Math.floor((Math.random() * 100) + 3)
            await console.log('randomWaitShort '+randomWaitShort);
            
            const randomWaitLong = Math.floor((Math.random() * 1000) + 876)

            var recipient;
            var recipientProfileUrl;
            
            if (messageType === "sent") {
               
                  var recipient = recipients[i].profileName || recipients[i].recipient;
                  var recipientProfileUrl = recipients[i].profileUrl || recipients[i].recipientProfileUrl;
                  
            } else if (messageType === "received") {
               
                  var recipient = recipients[i].sender;
                  var recipientProfileUrl = recipients[i].senderProfileUrl;
            }
           
            let messageWithName = message.replace("<<profileName>>", recipient);
            await console.log("**iterating array: profile " + recipientProfileUrl);
         
            var successText;
            var failureText;
            
            if (isTestMode) {
               var successText = "Success - Test";
               var failureText = "Error - Test";
            } else {
               var successText = "Success";
               var failureText = "Error";
            }
            
            //try to load the profile page
            try {
               await page.goto(recipientProfileUrl, {waitUntil: 'networkidle0'});
               await console.log('**navigated to: ' + recipientProfileUrl);
            } catch(error) {
               await console.log('ERROR! could not navigate to url ' + recipientProfileUrl);
               console.log(error);
                        sendMessageResult.push({recipientProfileUrl : recipientProfileUrl,
                                               recipient: recipient,
                                                message: messageWithName,
                                                sender: sender,
                                                senderProfileUrl: senderProfileUrl,
                                                messageResult: failureText,
                                                uniqueIndex : recipient + '^' + sender + '^' + localTime});
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
    
            try {
               await page.waitForSelector('.sc-button-message')
               await console.log('**got send message button')
            } catch(error) {
                  console.log('ERROR! could not access send message button!');

                  sendMessageResult.push({recipientProfileUrl : recipientProfileUrl,
                                               recipient: recipient,
                                                message: messageWithName,
                                                sender: sender,
                                                senderProfileUrl: senderProfileUrl,
                                                messageResult: failureText,
                                                uniqueIndex : recipient + '^' + sender + '^' + localTime});
                  
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
                          sendMessageResult.push({recipientProfileUrl : recipientProfileUrl,
                                               recipient: recipient,
                                                message: messageWithName,
                                                senderProfileUrl: senderProfileUrl,
                                                sender: sender,
                                                messageResult: failureText,
                                                uniqueIndex : recipient + '^' + sender + '^' + localTime});
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

                     sendMessageResult.push({recipientProfileUrl : recipientProfileUrl,
                                               recipient: recipient,
                                                message: messageWithName,
                                                senderProfileUrl: senderProfileUrl,
                                                sender: sender,
                                                messageResult: failureText,
                                                uniqueIndex : recipient + '^' + sender + '^' + localTime});
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
                         sendMessageResult.push({recipientProfileUrl : recipientProfileUrl,
                                               recipient: recipient,
                                                message: messageWithName,
                                                senderProfileUrl: senderProfileUrl,
                                                sender: sender,
                                                messageResult: failureText,
                                                uniqueIndex : recipient + '^' + sender + '^' + localTime});
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
         
            if (isTestMode) {
               
               await console.log('IS Test Mode so will not actually send the message...');
           
            } else if (!isTestMode) {
               
               await console.log('IS NOT Test Mode so about to send message!');
            
               //try to send the message!
               try {
                  await page.click('.composeMessage__sendButton');
                  await console.log('**Message sent to ' + recipientProfileUrl);
               } catch(error) {
                  await console.log('ERROR! could not send message to ' + recipientProfileUrl);
                             
                        sendMessageResult.push({recipientProfileUrl : recipientProfileUrl,
                          recipient: recipient,
                            message: messageWithName,
                            senderProfileUrl: senderProfileUrl,
                            sender: sender,
                            messageResult: failureText,
                            uniqueIndex : recipient + '^' + sender + '^' + localTime});
                  continue;
                  //return;
               }
            
            }
            
            //await page.waitFor(randomWaitLong);          
                      
            try {
               await page.screenshot({path: utils.screenshotPath + '/message/screenshot-after-message-send.png'});
               await console.log('**screenshot saved**');
            } catch(error) {
               console.log(error)
               await console.log('ERROR! screenshot could not be saved!');
            }
    
         
            sendMessageResult.push({recipientProfileUrl : recipientProfileUrl,
                                    recipient: recipient,
                                      message: messageWithName,
                                      senderProfileUrl: senderProfileUrl,
                                      sender: sender,
                                      messageResult: successText,
                                      uniqueIndex : recipient + '^' + sender + '^' + localTime});
            
         
      }// end of for loop
      
      //console.log(sendMessageResult);
      
      //close the browser
      await browser.close();
      
      return sendMessageResult;

    }



   const scrapeNewMessages = async (url, scCookies, scUsername, scProfile) => {
        
        //await console.log(scUsername);
        //await console.log(scPasswordPlain);
      const today = new Date();
      const offset = today.getTimezoneOffset();
      const localTime = moment(today).subtract(offset, 'minutes').toISOString();
            
        const browser = await connection.puppeteer.launch(connection.options);
     
        const page = await browser.newPage();
       
        //await page.setExtraHTTPHeaders({Referer: 'https://soundcloud.com/'});
        //await page.setDefaultNavigationTimeout(0);
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
             return Promise.reject(new Error("ERROR! cookies could not be loaded"));
         }
       
        try {
           await page.goto(url, {waitUntil: 'networkidle0'});
           await console.log('**navigated to: ' + url);
        } catch(error) {
           await console.log('ERROR! could not navigate to url ' + url);
           return Promise.reject(new Error('ERROR! could not navigate to url ' + url));
        }
  
      
         try {
             await page.waitForSelector('.notificationIcon ')
             await console.log('got .notificationIcon');
         } catch(error) {
             await console.log(error)
             await console.log('ERROR! could not get .notificationIcon');
         }


         try {
               await page.click('.header__userNavMessagesButton ');
               await console.log('**clicked header__userNavMessagesButton **');
            } catch(error) {
               await console.log('ERROR! could not click header__userNavMessagesButton !');
                console.log(error)
         }
      
         try {
            await page.waitForSelector('.dropdownContent__list')
            await console.log('got .dropdownContent__list');
        } catch(error) {
            await console.log(error)
            await console.log('ERROR! could not get .dropdownContent__list');
        }
      
      
         try {
            await page.screenshot({path: utils.screenshotPath + '/message/screenshot-after-clicks.png'});
            await console.log('**screenshot saved**');
         } catch(error) {
            console.log(error)
            await console.log('ERROR! screenshot could not be saved!');
         }
         
            
         const messages = await page.evaluate(({scUsername, scProfile, localTime}) => {
            
               messageSendersArray = [];
               let messageSenders = Array.from(document.querySelectorAll(".notificationBadge__username"));
               
               for(i=0; i < messageSenders.length; i++) {
                  let senderFormatted = messageSenders[i].innerHTML.replace(/^\s+|\s+$/g, '').trim();
                  
                   messageSendersArray.push({ idx: i,
                                            sender: senderFormatted
                                            });
                   
               }
               
               messageArray = [];
               let messages = Array.from(document.querySelectorAll(".notificationBadge__main > span.sc-truncate"));
          
               for(i=0; i < messages.length; i++) {
                  
                  let messageFormatted = messages[i].innerHTML.replace(/^\s+|\s+$/g, '').trim();
            
                   messageArray.push({ idx: i,
                                     message: messageFormatted
                                     }); 
               }
           
                messageSenderUrlArray = [];
               let messageSenderUrls = Array.from(document.querySelectorAll(".userAvatarBadge__link"));
            
               for(i=0; i < messageSenderUrls.length; i++) {
                  
                  let messageSenderUrlFormatted = "https://soundcloud.com" + messageSenderUrls[i].getAttribute("href").replace(/^\s+|\s+$/g, '').trim();
                  
                   messageSenderUrlArray.push({ idx: i,
                                             senderProfileUrl: messageSenderUrlFormatted
                                          }); 
               }
               
               messageTimesArray = [];
               let messageTimes = Array.from(document.querySelectorAll(".conversationBadge__time  > .relativeTime"));
            
               for(i=0; i < messageTimes.length; i++) {
                  
                  let messageTimeFormatted = messageTimes[i].getAttribute("datetime").replace(/^\s+|\s+$/g, '').trim();
                  
                   messageTimesArray.push({ idx: i,
                                          recipient: scUsername,
                                          recipientProfileUrl: scProfile,
                                          messageResult: "Success",
                                          scMessageTime: messageTimeFormatted,
                                          uniqueIndex : scUsername + '^' + scProfile + '^' + messageTimeFormatted
                                          }); 
               }
                    
               
               return {messageSendersArray: messageSendersArray, messageArray: messageArray, messageTimesArray: messageTimesArray, messageSenderUrlArray: messageSenderUrlArray};
         
            }, {scUsername, scProfile, localTime});
         
         
            let combinedArray = await utils.joinObjects(messages.messageSendersArray, messages.messageArray, messages.messageTimesArray, messages.messageSenderUrlArray);

  
         await browser.close()


        return combinedArray;
    }
    

    /*const scrapeMessages = async (messagesPage, scCookies, scUsername, scProfile) => {
        
        //await console.log(scUsername);
        //await console.log(scPasswordPlain);
        const browser = await connection.puppeteer.launch(connection.options);
     
        const page = await browser.newPage();
       
        //await page.setExtraHTTPHeaders({Referer: 'https://soundcloud.com/'});
        //await page.setDefaultNavigationTimeout(0);
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
             return Promise.reject(new Error("ERROR! cookies could not be loaded"));
         }
       
        try {
           await page.goto(messagesPage, {waitUntil: 'networkidle0'});
           await console.log('**navigated to: ' + messagesPage);
        } catch(error) {
           await console.log('ERROR! could not navigate to url ' + messagesPage);
           return Promise.reject(new Error('ERROR! could not navigate to url ' + messagesPage));
        }
  
         
        try {
            await page.waitForSelector('.inbox__list')
            await console.log('got .inbox__list');
        } catch(error) {
            await console.log(error)
            await console.log('ERROR! could not get .inbox__list');
        }
         
                  
        try {
            await page.waitForSelector('.g-scrollable-inner')
            await console.log('got .g-scrollable-inner');
        } catch(error) {
            await console.log(error)
            await console.log('ERROR! could not get .g-scrollable-inner');
        }
        
        
         try {
            await utils.autoScrollDown(page);
            await console.log('**scrolled down on page');
         } catch(error) {
            await console.log("ERROR! could not scroll down on page");
         }
         
        try {
            await utils.autoScrollDownElement(page);
            await console.log('**scrolled down on .g-scrollable-inner');
         } catch(error) {
            await console.log("ERROR! could not scroll down on .g-scrollable-inner");
         }
   
         try {
            await page.screenshot({path: utils.screenshotPath + '/message/screenshot-after-scroll-down.png'});
            await console.log('**screenshot saved**');
         } catch(error) {
            console.log(error)
            await console.log('ERROR! screenshot could not be saved!');
         }
         
         
         const messages = await page.evaluate(({scUsername, scProfile, localTime}) => {
            
               messageSendersArray = [];
               let messageSenders = Array.from(document.querySelectorAll(".conversationBadge__senderName"));
               
               for(i=0; i < messageSenders.length; i++) {
                  let senderFormatted = messageSenders[i].innerHTML.replace(/^\s+|\s+$/g, '').trim();
                   messageSendersArray.push({ id: i,
                                            sender: senderFormatted
                                            });
                   
               }
               
               messageArray = [];
               let messages = Array.from(document.querySelectorAll(".conversationBadge__body"));
          
               for(i=0; i < messages.length; i++) {
                  
                  let messageFormatted = messages[i].innerHTML.replace(/^\s+|\s+$/g, '').trim();
            
                   messageArray.push({ id: i,
                                     message: messageFormatted
                                     }); 
               }
           
               messageTimesArray = [];
               let messageTimes = Array.from(document.querySelectorAll(".conversationBadge__time  > .relativeTime"));
            
               for(i=0; i < messageTimes.length; i++) {
                  
                  let messageTimeFormatted = messageTimes[i].getAttribute("datetime").replace(/^\s+|\s+$/g, '').trim();
                  
                   messageTimesArray.push({ id: i,
                                          recipient: scUsername,
                                          recipientProfileUrl: scProfile,
                                          messageResult: "Success",
                                          scMessageTime: messageTimeFormatted,
                                          uniqueIndex : scUsername + '^' + scProfile + '^' + messageTimeFormatted
                                          }); 
               }
               
               return {messageSendersArray: messageSendersArray, messageArray: messageArray, messageTimesArray: messageTimesArray};
         
            }, {scUsername, scProfile, localTime});
         
         
            let combinedArray = await utils.joinObjects(messages.messageSendersArray, messages.messageArray, messages.messageTimesArray);

            
            
            const getProfileUrls = await page.evaluate(async () => {
               let profileUrls = [];
               
               let elements = document.getElementsByClassName('conversationBadge__senderName');
               for (let element of elements) {
                  await new Promise(function(resolve) {setTimeout(resolve, 1000)});
                                  
                  let messageFrom = document.querySelector(".conversationMessage__from > a");
                  profileUrls.push(messageFrom.getAttribute("href"));
               
                  await element.click();
                   //console.log('clicked' + element.innerHTML)
               }
               
               return profileUrls;
            
            });
            
            
            console.log(getProfileUrls);
         
         
            try {
               await page.screenshot({path: utils.screenshotPath + '/message/screenshot-after-clicks.png'});
               await console.log('**screenshot saved**');
            } catch(error) {
               console.log(error)
               await console.log('ERROR! screenshot could not be saved!');
            }
         

       
         
         //await browser.close()


        return combinedArray;
    } */
    

module.exports = { sendMessageOnProfile, scrapeNewMessages }