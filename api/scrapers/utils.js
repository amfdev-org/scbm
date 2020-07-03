const fs = require('fs').promises;

const rootPath = '/var/www/vhosts/scbm';
const apiPath = rootPath + "/api"
const screenshotPath = apiPath + "/screenshots";
const userDataPath = apiPath  + "/user_data";

const scUsername = "phattunes1983@gmail.com";
const scPassword = "Melon10283";

const randomWait1 = Math.floor((Math.random() * 1000) + 3);
const randomWait2 = Math.floor((Math.random() * 1000) + 4);
const randomWait3 = Math.floor((Math.random() * 1000) + 9);
const randomWait4 = Math.floor((Math.random() * 1000) + 11);
const randomWait5 = Math.floor((Math.random() * 1000) + 14);
const randomWait6 = Math.floor((Math.random() * 1000) + 15);
const randomWait7 = Math.floor((Math.random() * 1000) + 17);
const randomWait8 = Math.floor((Math.random() * 1000) + 18);
const randomWaitLong = Math.floor((Math.random() * 1000) + 1567);
const randomWaitVeryLong = Math.floor((Math.random() * 1000) + 3567);
     
    async function autoScrollDown(page) {
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
    
    async function autoScrollUp(page) {
        await page.evaluate(_ => {
        window.scrollTo(0, 0);
        });
    }
    
    
    async function getRandomLink(page) {
            // get all links on page 
        const getLinks = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a'))
            return links.map(link => link.href).slice(0, 9999)
        })
  
        //de-dupe links
        uniqueLinks = await Array.from(new Set(getLinks));
        
        //select link at random
        var randomLink = await uniqueLinks[Math.floor(Math.random()*uniqueLinks.length)];
        
        return randomLink;
    }


    async function saveCookies(page) {          
        const cookies = await page.cookies();
        //await console.log(cookies);
        await fs.writeFile(userDataPath +  '/cookies.json', JSON.stringify(cookies, null, 2));
    }


    async function loadCookies(page) {          
        const cookiesString = await fs.readFile(userDataPath + '/cookies.json');
        const cookies = JSON.parse(cookiesString);
        await console.log(cookies);
        await page.setCookie(...cookies);
    }
    
    
    module.exports = {
                rootPath,
                apiPath,
                screenshotPath,
                userDataPath,
                scUsername,
                scPassword,
                randomWait1,
                randomWait2,
                randomWait3,
                randomWait4,
                randomWait5,
                randomWait6,
                randomWait7,
                randomWait8,
                randomWaitLong,
                randomWaitVeryLong,
                autoScrollDown,
                autoScrollUp,
                getRandomLink,
                saveCookies
                };