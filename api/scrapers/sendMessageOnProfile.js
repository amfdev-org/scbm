const fs = require('fs').promises;
const path = require('path');
const utils = require('./utils');    
const connection = require('./connection')
//const ProxyChain = require('proxy-chain');
//const randomUseragent = require('random-useragent');

   const doLogin = async (profileUrl, message) => {
             
      //instantiate puppeteer, browser and page
      const browser = await connection.puppeteer.launch(connection.options);
      const page = await browser.newPage();
      //await page.setExtraHTTPHeaders(headers);
      await page.setDefaultNavigationTimeout(0);
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
         return;
      }

      
      
      //try to take the final screenshot
      try {
         await page.screenshot({path: utils.screenshotPath + '/screenshot.png'});
         await console.log('**screenshot saved**');
      } catch(error) {
         await console.log('ERROR! screenshot could not be saved!');
      }

      //close the browser
      await browser.close();

    }



module.exports.doLogin = doLogin