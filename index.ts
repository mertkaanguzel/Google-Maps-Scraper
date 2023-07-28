import dotenv from 'dotenv';
dotenv.config();
import { Browser, Page } from 'puppeteer-core';
import { writeFileSync } from 'fs';
import prompt from './prompts';
import { IPlace } from './types';

async function run() {
  try {
    const [searchTerm, latitude, longitude] = await prompt();
    console.log(searchTerm, latitude, longitude);

    const { default: Browser } = await import(`./browsers/${process.env.BROWSER_TYPE}`); 
    const browser: Browser = await Browser();

    //const context = browser.defaultBrowserContext();
    //await context.overridePermissions('https://google.com', ['geolocation']);

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);

    await page.setGeolocation({latitude: parseInt(latitude), longitude: parseInt(longitude)});

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
    //wait for elements to render
    await page.waitForSelector(selector);

    await waitForCondition(page, 20);

    const data = await page.evaluate(async () => {
      const locations: IPlace[] = [];
      const locationsWithAdress = document.querySelectorAll('.Q2HXcd');
      const locationsWithAdressAndWebsite = document.querySelectorAll('.tH5CWc');

      if (locationsWithAdress.length !== 0) {
        locationsWithAdress.forEach(element => {
          locations.push({
            name: element.querySelector('.qBF1Pd')?.textContent as string,
          });
        });
      }

      if (locationsWithAdressAndWebsite.length !== 0) {
        locationsWithAdressAndWebsite.forEach(element => {
          locations.push({
            name: element.querySelector('.qBF1Pd')?.textContent as string,
            website: element.querySelector('.lcr4fd')?.href as string,
          });
        });
      }

      return locations;
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

//Scrolls down the component until the number of the places equal to the argument named limit
async function waitForCondition(page: Page, limit: number) {
  let itemCount: number = 0;
  await page.hover('[role=\'feed\']');

  //focus on the list of places
  await page.focus('[role=\'feed\']');

  await page.keyboard.down('ArrowDown');
  await page.waitForSelector('.QjC7t');

  do {
    await page.keyboard.down('ArrowDown');
    itemCount = await page.evaluate(() => document.querySelector('.QjC7t')?.children.length) as number;
  } while ((limit * 2) > itemCount);
}