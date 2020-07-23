const fs = require('fs').promises;
const fs_ = require('fs');
const path = require('path');
const utils = require('./utils');    
const connection = require('./connection')
//const ProxyChain = require('proxy-chain');
//const randomUseragent = require('random-useragent');

const util = require('util');
const log_file = fs_.createWriteStream(utils.logPath + '/debug.log', {flags : 'a'});
const log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

   const login = async (url, scUsername, scPassword, sanitizedUsername) => {
          
      //instantiate puppeteer, browser and page
      const browser = await connection.puppeteer.launch(connection.options);
      const page = await browser.newPage();
      //await page.setExtraHTTPHeaders(headers);
      //await page.setDefaultNavigationTimeout(0);
      await console.log("**browser and page instantiated**");
      
      // evaluate document + apply stealth preoad
      await page.evaluateOnNewDocument(connection.preload, connection.device);
      await console.log("**document evaluated + stealth preload applied**");

      //try to load the signin page
      try {
         await page.goto(url, {waitUntil: 'networkidle0'});
         await console.log('**navigated to: ' + url);
      } catch(error) {
         await console.log('ERROR! could not navigate to url ' + url);
         throw new Error(error)
      }
      
      try {
        await page.screenshot({path: utils.screenshotPath + '/login/screenshot-after-navigate.png'});
        await console.log('**screenshot saved**');
     } catch(error) {
        console.log(error)
        await console.log('ERROR! screenshot could not be saved!');
     }
            
      //await page.waitFor(utils.randomWait1);
      
      //check for the webauthcontainer iframe
      await page.waitForSelector('.webAuthContainer')
      .catch ((error) => {
        console.log('ERROR! could not load webauth iframe!');
        throw new Error(error)
      })

      const elementHandle = await page.$('div.webAuthContainer iframe');
      const frame = await elementHandle.contentFrame();
      await console.log('**webauth iframe loaded**');

      //check for the webauthcontainer iframe
      await frame.waitForSelector('input[name="email"]')
      .catch ((error) => {
        console.log('ERROR! could not access username input!');
        throw new Error(error)
      })

      const username = await frame.$('input[name="email"]');
      await console.log("**username/email input found**");

      //try to fill out the username
      try {
         await username.type(scUsername, {delay: utils.randomWaitShort1});
         await console.log('**username entered - ' + scUsername);
      } catch(error) {
         await console.log('ERROR! could not enter username! - ' + scUsername);
         throw new Error(error)
      }
      
      await frame.waitFor(utils.randomWait3);
      
      //try to submit username
      try {
         await frame.click('#sign_in_up_submit');
         await console.log('**username submitted** - ' + scUsername);
      } catch(error) {
         await console.log('ERROR! could not submit username! - ' + scUsername);
         throw new Error(error)
      }
      
      await frame.waitFor(utils.randomWait4);

      //check for password input
       await frame.waitForSelector('#enter_password_field')
        .then(() => console.log('**got password input'))
      .catch ((error) => {
        console.log("ERROR! could not access password input!");
        throw new Error(error)
      })
      
      const password = await frame.$('#enter_password_field');
      
      //try to fill out the password
      try {
         await password.type(scPassword, {delay: utils.randomWaitShort2});
         await console.log('**password entered - ' + scPassword);
      } catch (error) {
         await console.log("ERROR! could not enter password! - " + scPassword);
         throw new Error(error)
      }

      await frame.waitFor(utils.randomWait5);

      //try to submit the password
      try {
         await frame.click('#enter_password_submit');
         await console.log('**password submitted** - ' + scPassword);
      } catch (error) {
         await console.log("ERROR! could not submit password! - " + scPassword);
         throw new Error(error)
      }
      
      //wait for login to be processed and webauth iframe to be removed, and to look like a user
      
      //scroll down inc/ lazy loading, like a user would do
      try {
         await utils.autoScrollDown(page);
         await console.log('**scrolled down on ' + url);
      } catch(error) {
         await console.log("ERROR! could not scroll down on " + url);
      }
      
      //another random wait
      await page.waitFor(utils.randomWait7);
        
        
      //NEW - get the profile URL
      await page.waitForSelector('.header__userNav > a.header__userNavUsernameButton')
        .then(() => console.log('**got username/profile link'))
      .catch ((error) => {
        console.log("ERROR! could not access username/profile link");
        throw new Error(error)
      })
      
      const profileUrl = await page.$eval('.header__userNav > a.header__userNavUsernameButton', el => el.href);
      console.log(profileUrl);
      //const html = await page.content();
      //console.log(html);
      
      /*
      //check for the cookie notice
      await frame.waitForSelector('.announcement__dismiss')
      .catch ((error) => {
        console.log("ERROR! announcement dismiss element could not be found!");
      })
      
      //try to dismiss the cookie notice
      try {
         await page.click('.announcement__dismiss');
         await console.log('**announcement dismissed**');
      } catch(error) {
         await console.log('ERROR! announcement could not be dismissed!'); 
      }
       
      //await page.waitFor(utils.randomWait8);

      //try to select link at random
      try {
         var randomLink = await utils.getRandomLink(page);
         await console.log('**random link scraped: ' + randomLink);
      } catch(error) {
         await console.log('ERROR! random link could not be scraped!');
         throw new Error(error)
      }
      
      //go to the random link. TODO: would be better to click a link
      try {
         await page.goto(randomLink, {waitUntil: 'networkidle0'});
         await console.log('**navigated to: ' + randomLink);
      } catch(error) {
         await console.log("ERROR! could not navigate to random link " + randomLink);
         throw new Error(error)
      }
      
      // long random wait to let new page load
      //await page.waitFor(utils.randomWaitLong);
      //await console.log('randomWaitLong: '+randomWaitLong);
      // scroll down on the new page, like a user would do
      try {
         await utils.autoScrollDown(page);
         await console.log('**scrolled down on ' + randomLink);
      } catch(error) {
         await console.log("ERROR! could not scroll down on "+randomLink);
      }
      
      //try to dismiss the cookie notice, if it's still there
      await frame.waitForSelector('.announcement__ack')
      .catch ((error) => {
        console.log("ERROR! announcement dismiss element could not be found!");
      })
      
      try {
         await page.click('.announcement__ack');
         await console.log('**announcement dismissed**');
      } catch(error) {
         await console.log('ERROR! announcement could not be dismissed!'); 
      }
   
      // scroll back up
      try {
         await utils.autoScrollUp(page);
         await console.log('**scrolled up on ' + randomLink);
      } catch(error) {
         await console.log("ERROR! could not scroll up on "+randomLink);
      }
      */
     await page.waitFor(utils.randomWaitVeryLong);
     
      //NOW GRAB THE SESSION COOKIES
      try {
         const cookies = await page.cookies();
         //const cookies = {test: "test"};
        //await console.log(cookies);
         //await console.log(utils.userDataPath +  '/' + sanitizedUsername);
         await fs.mkdir(utils.userDataPath +  '/' + sanitizedUsername, { recursive: true }).catch(console.error);
         await console.log('**cookie directory created**');
         await fs.writeFile(utils.userDataPath +  '/' + sanitizedUsername + '/cookies.json', JSON.stringify(cookies, null, 2));
         await console.log('**cookies saved**');
      } catch(error) {
         await console.log('ERROR! cookies could not be saved!');
         throw new Error(error)
      }
      
      //CHECK COOKIE FILE IS NOT ZERO BYTES
      //NOW DOING A FULL VALIDATE IN THE PROMISE CHAIN
      //const fileStat = await fs.stat(utils.userDataPath +  '/' + sanitizedUsername + '/cookies.json')
      //if(!fileStat["size"] > 0) {
      //   await console.log('ERROR! cookie file zero bytes.');
      //   throw new Error('ERROR! cookie file zero bytes.')
      //}
      
      //try to take the final screenshot
      //try {
      //   await page.screenshot({path: utils.screenshotPath + '/screenshot.png'});
      //   await console.log('**screenshot saved**');
      //} catch(error) {
      //   await console.log('ERROR! screenshot could not be saved!');
      //}
      
      //close the browser
      await browser.close();
      
      let obj = {scCookies: sanitizedUsername + '/cookies.json', scProfile: profileUrl};
      return obj;

    }



module.exports = { login }