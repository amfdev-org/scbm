//const randomUseragent = require('random-useragent');
//const ProxyChain = require('proxy-chain');

const fs = require('fs').promises;

const utils = require('../utils');    
const connection = require('./connection')
const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
  
stealth.onBrowser = () => {};
puppeteer.use(stealth);

//const select = require('puppeteer-select');
//const combineImage = require('combine-image');

        /*const proxies = [
            "23.250.15.153:2906",
            "104.144.140.88:2906",
            "104.144.27.66:2906",
            "104.144.81.69:2906",
            "192.241.82.190:2906",
            "104.144.66.164:2906",
            "104.144.100.115:2906",
            "104.144.232.180:2906",
            "104.144.33.155:2906",
            "104.144.54.169:2906"
        ];
        
        var randomProxy = proxies[Math.floor(Math.random()*proxies.length)];
        const proxyAuth = "dusk1983:7Luru457s";
        const oldProxyUrl = 'http://'+proxyAuth+'@'+randomProxy;
        const newProxyUrl = await ProxyChain.anonymizeProxy(oldProxyUrl);
     
        var userAgent = randomUseragent.getRandom(function (ua) {
	return (parseFloat(ua.browserVersion) >= 45);
        });*/

        
    const scrapeTest = async (url) => {

        const args = [
        '--no-sandbox',
        //'--disable-setuid-sandbox',
        //'--disable-infobars',
        //'--window-position=0,0',
        //'--ignore-certifcate-errors',
        //'--ignore-certifcate-errors-spki-list',
        //'--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"',
        //'--proxy-server='+newProxyUrl,
        //'--disable-web-security',
        //'--allow-running-insecure-content',
        //'--disable-gpu',
        //'--disable-features=site-per-process',
        //`--window-size=${device.viewport.width},${device.viewport.height}`
        '--start-fullscreen'
        ];

        const headers = {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", 
                    "Accept-Encoding": "gzip, deflate, br", 
                    "Accept-Language": "en-US,en;q=0.9,it;q=0.8", 
                    "Cache-Control": "max-age=0", 
                    "Referer": "https://www.soundcloud.com/signin", 
                    "Upgrade-Insecure-Requests": "1"
                };
   
        const options = {
            args,
            headless: true,
            ignoreHTTPSErrors: true,
            //slowMo: 50
        };
        

        const browser = await puppeteer.launch(options);
    
        const page = await browser.newPage();
        
        //await page.setExtraHTTPHeaders(headers);
        await page.setDefaultNavigationTimeout(0);
        
        await page.goto(url, {waitUntil: 'networkidle0'});
         
        await page.waitFor(utils.randomWait1);
        
        await page.screenshot({ path: 'test-screenshot.png', fullPage: true });
        
        await browser.close();
        
    }
    
    
    
        const scrapeTestSc = async (url) => {
        
            //instantiate puppeteer, browser and page
            const browser = await connection.puppeteer.launch(connection.options);
            const page = await browser.newPage();
            //await page.setExtraHTTPHeaders(headers);
            await page.setDefaultNavigationTimeout(0);
            await console.log("**browser and page instantiated**");
            
            // evaluate document + apply stealth preoad
            await page.evaluateOnNewDocument(connection.preload, connection.device);
            await console.log("**document evaluated + stealth preload applied**");
        
            //LOAD any cookies
            try {
                const cookiesString = await fs.readFile(utils.userDataPath + '/cookies.json');
                const cookies = JSON.parse(cookiesString);
                await page.setCookie(...cookies);
                await console.log("**cookies loaded**");
            } catch(error) {
                await console.log("ERROR! cookies could not be loaded");
            }
      
            //try to load the signin page
            try {
               await page.goto(url, {waitUntil: 'networkidle0'});
               await console.log('**navigated to: ' + url);
            } catch(error) {
               await console.log('ERROR! could not navigate to url ' + url);
               return;
            }
      
            await page.waitFor(utils.randomWait1);
            
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



module.exports = { scrapeTest, scrapeTestSc }