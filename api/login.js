//const randomUseragent = require('random-useragent');
const fs = require('fs')
//const ProxyChain = require('proxy-chain');
const utils = require('./utils');    
const connection = require('./connection')

    const doLogin = async (query) => {
             

        const browser = await connection.puppeteer.launch(connection.options);
      
        const page = await browser.newPage();
        
        //await page.tracing.start({ path: './trace.json' });
        await page.evaluateOnNewDocument(connection.preload, connection.device);
        
        //await page.setExtraHTTPHeaders(headers);
        //await page.setDefaultNavigationTimeout(0);
        
        await page.goto(url, {waitUntil: 'networkidle0'});
                
        await page.waitFor(utils.randomWait1);
        
   
         await page.waitForSelector("iframe");
         const elementHandle = await page.$('div.webAuthContainer iframe');
         const frame = await elementHandle.contentFrame();
         
         await frame.waitForSelector('input[name="email"]');
         const username = await frame.$('input[name="email"]');
         await username.type('phattunes1983@gmail.com', {delay: utils.randomWait4});
     
         await frame.waitFor(utils.randomWait2);
         
         await frame.click('#sign_in_up_submit');
         
         await frame.waitFor(utils.randomWait3);
 
         await frame.waitForSelector('#enter_password_field');
         const password = await frame.$('#enter_password_field');
         await password.type('Melon10283', {delay: utils.randomWait5});
         
         await frame.waitFor(utils.randomWait6);
         
         await frame.click('#enter_password_submit');
         
         await frame.waitFor(utils.randomWaitLong);
        

        
        await page.screenshot({ path: 'screenshot.png' });
        
        //await page.tracing.stop();
        
        
       
        await browser.close();

        
    }



module.exports.doLogin = doLogin