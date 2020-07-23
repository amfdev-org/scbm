const fs = require('fs');

const utils = require('./utils');    
const connection = require('./connection')

    /*puppeteer.launch({args: ['--no-sandbox']}).then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://www.soundcloud.com');
    const title = await page.title()
    //console.log(title)
    res.json({ message: 'scrape complete!', result: title });
    
    await browser.close();
    });
    */
const util = require('util');
const log_file = fs.createWriteStream(utils.logPath + '/debug.log', {flags : 'a'});
const log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

    const scrapeCommenters = async (searchUrl, scCookies) => {
        
        //await console.log(scUsername);
        //await console.log(scPasswordPlain);
        
        const browser = await connection.puppeteer.launch(connection.options);
     
        const page = await browser.newPage();
       
        //await page.setExtraHTTPHeaders({Referer: 'https://soundcloud.com/'});
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
           await page.goto(searchUrl, {waitUntil: 'networkidle0'});
           await console.log('**navigated to: ' + searchUrl);
        } catch(error) {
           await console.log('ERROR! could not navigate to url ' + searchUrl);
           return Promise.reject(new Error('ERROR! could not navigate to url ' + searchUrl));
        }
  
         //await page.waitFor(utils.randomWait1);
        
        try {
            await page.waitForSelector('span.commentItem__username > a', {
            timeout: 6000
          })
            //.catch ((error) => {  
            //  console.log('ERROR! could not access span.commentItem__username > a!');
            //})
        } catch {
  
                if (await page.waitForSelector('div.emptyComments')) {
                    
                    //await console.log('div.emptyComments found. That means no commenters')
                    //throw new Error('no commenters')
                    throw {error: "no commenters"}
                    //return;
                
                } else {

                     //await console.log('ERROR! could not access span.commentItem__username OR div.emptyComments!')
                    throw new Error('ERROR! could not access span.commentItem__username OR div.emptyComments!')
                    //return;
 
                } 
   
        }
        
    
        //await page.waitFor(utils.randomWait2);
        
        try {
            await utils.autoScrollDown(page);
            await console.log('**scrolled down on ' + searchUrl);
         } catch(error) {
            await console.log("ERROR! could not scroll down on " + searchUrl);
         }
    
         //await page.waitFor(utils.randomWait3);
    
        const profileUrlsRaw = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('span.commentItem__username > a'))
            return links.map(link => link.href + '^' + link.innerHTML)
        })
        
        profileUrlsRawUnique = Array.from(new Set(profileUrlsRaw));
        
        profileUrls = []
        var jsonObj = {};
        for (var i = 0 ; i < profileUrlsRawUnique.length; i++) {
                var [profileUrl, profileName] = profileUrlsRawUnique[i].split('^');
                //var profileUrlRelative = profileUrl.replace("https://soundcloud.com", "");
                profileUrls.push({searchUrl: searchUrl,
                                 profileUrl : profileUrl,
                                 profileName : profileName
                                 });
        }

        await browser.close()
    
        /*profileUrls = [ { searchUrl: searchUrl, profileUrl: 'https://soundcloud.com/ocmoon', profileName: "OC Moon" },
                        { searchUrl: searchUrl, profileUrl: 'https://soundcloud.com/fogcapture', profileName: "fogcapture"  },
                        { searchUrl: searchUrl, profileUrl: 'https://soundcloud.com/patrickxtaylor', profileName: "patrpick taylor" } ];*/
        
        //await console.log(profileUrls);

        return profileUrls
    }



module.exports = { scrapeCommenters }