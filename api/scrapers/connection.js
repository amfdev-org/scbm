const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();

const puppeteerExtraPluginUserAgentOverride = require('puppeteer-extra-plugin-stealth/evasions/user-agent-override');
stealth.enabledEvasions.delete('user-agent-override'); // Remove this specific stealth plugin from the default set

        const device = {
           userAgent: 'Mozilla/5.0 (Macintosh)',
           viewport: {
             width: 1200,
             height: 800,
             deviceScaleFactor: 1,
             isMobile: false,
             hasTouch: false,
             isLandscape: true,
           },
           locale: 'en-US,en;q=0.9',
           platform: 'Macintosh',
         };
         
         
         function preload(device) {
           Object.defineProperty(navigator, 'platform', {
             value: device.platform,
             writable: true,
           });
           Object.defineProperty(navigator, 'userAgent', {
             value: device.userAgent,
             writable: true,
           });
           Object.defineProperty(screen, 'height', {
             value: device.viewport.height,
             writable: true,
           });
           Object.defineProperty(screen, 'width', {
             value: device.viewport.width,
             writable: true,
           });
           Object.defineProperty(window, 'devicePixelRatio', {
             value: device.viewport.deviceScaleFactor,
             writable: true,
           });
         }
         
   
         const pluginUserAgentOverride = puppeteerExtraPluginUserAgentOverride({
           userAgent: device.userAgent,
           locale: device.locale,
           platform: device.platform,
         });
         
         
        stealth.onBrowser = () => {};
        puppeteer.use(stealth);

   
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
        '--disable-features=site-per-process',
        `--window-size=${device.viewport.width},${device.viewport.height}`,
         '--incognito'
        ];

        const headers = {
                    //"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", 
                    //"Accept-Encoding": "gzip, deflate, br", 
                    //"Accept-Language": "en-US,en;q=0.9,it;q=0.8", 
                    //"Cache-Control": "max-age=0", 
                    //"Upgrade-Insecure-Requests": "1",
                     "Referer": "https://www.soundcloud.com"
                };
   
        const options = {
            args,
            headless: true,
            ignoreHTTPSErrors: true,
            slowMo: 200,
            defaultViewport: device.viewport
        };
        
        module.exports = {
                        puppeteer,
                        stealth,
                        puppeteerExtraPluginUserAgentOverride,
                        device,
                        preload,
                        args,
                        headers,
                        options
                        };