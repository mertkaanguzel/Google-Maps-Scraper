import dotenv from 'dotenv';
dotenv.config();
import { Browser } from 'puppeteer-core';
import { writeFileSync } from 'fs';

const searchTerm = 'yazilim+firmalari';
const latitude = '39';
const longitude = '32';

async function run() {
  try {
    const { default: Browser } = await import(`./browsers/${process.env.BROWSER_TYPE}`); 
    const browser: Browser = await Browser();

    //const context = browser.defaultBrowserContext();
    //await context.overridePermissions('https://google.com', ['geolocation']);

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);

    await page.setGeolocation({latitude: 39, longitude: 32});

    /*
    const client = await page.target().createCDPSession();
    await client.send('Network.enable');
    await client.send('Emulation.setGeolocationOverride', {
      accuracy: 100,
      latitude: 39,
      longitude: 32,
    });
    */

    await page.goto(`https://www.google.com/maps/search/${searchTerm}/@${latitude},${longitude}`);
   
    const selector = '.qBF1Pd';

    await page.waitForSelector(selector);

    const data = await page.evaluate(() => {
      const firms: any[] = [];
      const firmsWithAdress = document.querySelectorAll('.Q2HXcd');
      const firmsWithAdressAndWebsite = document.querySelectorAll('.tH5CWc');

      if (firmsWithAdress.length !== 0) {
        firmsWithAdress.forEach(element => {
          firms.push({
            name: element.querySelector('.qBF1Pd')?.textContent,
          });
        });
      }

      if (firmsWithAdressAndWebsite.length !== 0) {
        firmsWithAdressAndWebsite.forEach(element => {
          firms.push({
            name: element.querySelector('.qBF1Pd')?.textContent,
            website: element.querySelector('.lcr4fd')?.href,
          });
        });
      }

      return firms;
    });

    await browser.close();

    console.log(data);
    writeFileSync('./output.txt', JSON.stringify(data));

  } catch (error) {
    console.error('Scraping failed', error);
  }
  finally {
    console.log('DONE!');
  }
}

run();
