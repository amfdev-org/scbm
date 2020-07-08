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


    const scrapeCommenters = async (songUrl) => {
        
        //await console.log(scUsername);
        //await console.log(scPasswordPlain);
    
        const browser = await connection.puppeteer.launch(connection.options);
     
        const page = await browser.newPage();
       
        //await page.setExtraHTTPHeaders({Referer: 'https://soundcloud.com/'});
        await console.log("**browser and page instantiated**");
            
        try {
           await page.goto(songUrl, {waitUntil: 'networkidle0'});
           await console.log('**navigated to: ' + songUrl);
        } catch(error) {
           await console.log('ERROR! could not navigate to url ' + songUrl);
           return Promise.reject(new Error('ERROR! could not navigate to url ' + songUrl));
        }
  
         await page.waitFor(utils.randomWait1);
         
        await page.waitForSelector('span.commentItem__username > a')
        .catch ((error) => {
          console.log('ERROR! could not access span.commentItem__username > a!');
          return Promise.reject(new Error('ERROR! could not access span.commentItem__username > a!'));
        })

        await page.waitFor(utils.randomWait2);
        
        try {
            await utils.autoScrollDown(page);
            await console.log('**scrolled down on ' + songUrl);
         } catch(error) {
            await console.log("ERROR! could not scroll down on " + songUrl);
         }
    
         await page.waitFor(utils.randomWait3);
    
        const profileUrlsRaw = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('span.commentItem__username > a'))
            return links.map(link => link.href).slice(0, 9999)
        })
    
        profileUrlsRawUnique = Array.from(new Set(profileUrlsRaw));
        
        profileUrls = []
        var jsonObj = {};
        for (var i = 0 ; i < profileUrlsRawUnique.length; i++) {
                profileUrls.push({songUrl: songUrl, profileUrl : profileUrlsRawUnique[i]});
        }
        
        await browser.close()
        
        /*profileUrls = [ { songUrl: songUrl, profileUrl: 'https://soundcloud.com/ocmoon' },
                        { songUrl: songUrl, profileUrl: 'https://soundcloud.com/fogcapture' },
                        { songUrl: songUrl, profileUrl: 'https://soundcloud.com/patrickxtaylor' },
                        { songUrl: songUrl, profileUrl: 'https://soundcloud.com/deceivingsounds' },
                        { songUrl: songUrl, profileUrl: 'https://soundcloud.com/matcatmusic' },
                        { songUrl: songUrl, profileUrl: 'https://soundcloud.com/alvonmars' },
                        { songUrl: songUrl, profileUrl: 'https://soundcloud.com/upukrecords' },
                        { songUrl: songUrl, profileUrl: 'https://soundcloud.com/user-355158966-477119345' },
                        { songUrl: songUrl, profileUrl: 'https://soundcloud.com/deftsoulmusique1995' },
                        { songUrl: songUrl, profileUrl: 'https://soundcloud.com/venkman' },
                        { songUrl: songUrl, profileUrl: 'https://soundcloud.com/user-221609609' } ];*/
        

        return await profileUrls
    }



module.exports = { scrapeCommenters }