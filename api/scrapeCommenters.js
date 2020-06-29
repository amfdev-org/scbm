const puppeteer = require('puppeteer');
const fs = require('fs');
const cookiesPath = "cookies.txt";

    /*puppeteer.launch({args: ['--no-sandbox']}).then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://www.soundcloud.com');
    const title = await page.title()
    //console.log(title)
    res.json({ message: 'scrape complete!', result: title });
    
    await browser.close();
    });
    */

    async function autoScroll(page){
      await page.evaluate(async () => {
          await new Promise((resolve, reject) => {
              var totalHeight = 0;
              var distance = 100;
              var timer = setInterval(() => {
                  var scrollHeight = document.body.scrollHeight;
                  window.scrollBy(0, distance);
                  totalHeight += distance;
  
                  if(totalHeight >= scrollHeight){
                      clearInterval(timer);
                      resolve();
                  }
              }, 400);
          });
      });
    } 

    const scrapeCommenters = async (url) => {
        
      const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
        });
      
       const page = await browser.newPage();
        await page.setExtraHTTPHeaders({Referer: 'https://soundcloud.com/'}) 
        await page.goto(url);
    
        await page.waitForSelector('span.commentItem__username > a');
        
        await page.setViewport({
            width: 1200,
            height: 800
        });
        
        await autoScroll(page);
        
        console.log('scrape starting in scrapeCommenters.js: COMMENTERS');
    
      const commenterUrls = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('span.commentItem__username > a'))
        return links.map(link => link.href).slice(0, 9999)
        })
    
        commenterUrlsUnique = Array.from(new Set(commenterUrls));
        
        commenters = []
        var jsonObj = {};
        for (var i = 0 ; i < commenterUrlsUnique.length; i++) {
                commenters.push({commenterUrl : commenterUrlsUnique[i]});
        }
        
        await browser.close();
        
        return commenters
    }



module.exports.scrapeCommenters = scrapeCommenters