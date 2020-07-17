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


    const scrapeFollowers = async (searchUrl, scCookies) => {
        
        //await console.log(scUsername);
        //await console.log(scPasswordPlain);
        let searchedProfileFollowersPage = searchUrl.replace(/\/$/, "").trim() + '/followers';
        
        const browser = await connection.puppeteer.launch(connection.options);
     
        const page = await browser.newPage();
       
        //await page.setExtraHTTPHeaders({Referer: 'https://soundcloud.com/'});
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
             return Promise.reject(new Error("ERROR! cookies could not be loaded"));
         }
       
        try {
           await page.goto(searchedProfileFollowersPage, {waitUntil: 'networkidle0'});
           await console.log('**navigated to: ' + searchedProfileFollowersPage);
        } catch(error) {
           await console.log('ERROR! could not navigate to url ' + searchedProfileFollowersPage);
           return Promise.reject(new Error('ERROR! could not navigate to url ' + searchedProfileFollowersPage));
        }
  
         //await page.waitFor(utils.randomWait1);
        
        
        try {
            await page.waitForSelector('.lazyLoadingList__list > li > div > div > a', {
            timeout: 6000
          })
            //.catch ((error) => {  
            //  console.log('ERROR! could not access span.commentItem__username > a!');
            //})
        } catch(error) {
  
                console.log(error)
   
        }
        
        
        
        //await page.waitFor(utils.randomWait2);
        
        try {
            await utils.autoScrollDown(page);
            await console.log('**scrolled down on ' + searchedProfileFollowersPage);
         } catch(error) {
            await console.log("ERROR! could not scroll down on " + searchedProfileFollowersPage);
         }
    
         //await page.waitFor(utils.randomWait3);
    
        const followerProfileUrlsRaw = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('.lazyLoadingList__list > li > div > div.userBadgeListItem__title > a'))
            return links.map(link => link.href + '^' + link.innerHTML.replace(/^\s+|\s+$/g, '').trim())
        })
        
        let followerProfileUrlsUnique = Array.from(new Set(followerProfileUrlsRaw));
        
        console.log(followerProfileUrlsUnique);
    
        let followerProfileUrls = [];
        //var jsonObj = {};
        for (var i = 0 ; i < followerProfileUrlsUnique.length; i++) {
                var [followerProfileUrl, followerProfileName] = followerProfileUrlsUnique[i].split('^');
                //var profileUrlRelative = profileUrl.replace("https://soundcloud.com", "");
                followerProfileUrls.push({
                                searchUrl: searchUrl,
                                 profileUrl : followerProfileUrl,
                                 profileName : followerProfileName
                                 });
        }

    
        await browser.close()
    
        /*profileUrls = [ { songUrl: songUrl, profileUrl: 'https://soundcloud.com/ocmoon', profileName: "OC Moon" },
                        { songUrl: songUrl, profileUrl: 'https://soundcloud.com/fogcapture', profileName: "fogcapture"  },
                        { songUrl: songUrl, profileUrl: 'https://soundcloud.com/patrickxtaylor', profileName: "patrpick taylor" } ];*/
        
        //await console.log(profileUrls);

        return followerProfileUrls
    }



module.exports = { scrapeFollowers }