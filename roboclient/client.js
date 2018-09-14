const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], ignoreHTTPSErrors: true, dumpio: false });
  const page = await browser.newPage();
  
  await page.goto('https://github.com');
  //await page.screenshot({ path: 'screenshots/github.png' });
  
  browser.close();
}

run();