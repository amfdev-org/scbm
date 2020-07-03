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


    const scrapeCommenters = async (url) => {
        
        const browser = await connection.puppeteer.launch(connection.options);
     
        const page = await browser.newPage();
       
        await page.setExtraHTTPHeaders({Referer: 'https://soundcloud.com/'});
        
        await page.goto(url);
    
        await page.waitForSelector('span.commentItem__username > a');
        
        await utils.autoScrollDown(page);
        
        console.log('scrape starting in scrapeCommenters.js: COMMENTERS');
    
        const profileUrlsRaw = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('span.commentItem__username > a'))
            return links.map(link => link.href).slice(0, 9999)
        })
    
        profileUrlsRawUnique = Array.from(new Set(profileUrlsRaw));
        
        profileUrls = []
        var jsonObj = {};
        for (var i = 0 ; i < profileUrlsRawUnique.length; i++) {
                profileUrls.push({profileUrl : profileUrlsRawUnique[i]});
        }
        
        await browser.close();
        
        return profileUrls
    }



module.exports.scrapeCommenters = scrapeCommenters