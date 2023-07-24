import * as readline from 'readline';
import puppeteer from 'puppeteer-core';
import dotenv from 'dotenv';
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('What is your search term? ', (answer: string) => {
  console.log(`Looking for ${answer} on Google Maps...`);
  rl.close();
});

async function run() {
  let browser;
  const auth = process.env.BD_USERNAME + ':' +  process.env.BD_PASSWORD;
  const url = `wss://${auth}@${process.env.BD_HOST}`;

  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: url,
    });

    return;
  } catch (error) {
    console.error('Scraping failed', error);
  }
  finally {
    await browser.close();
  }
}

run();


/* GOOGLE MAPS ELEMENTS
let firmsWithAdress = document.getElementsByClassName('Nv2PK Q2HXcd THOPZb ');
let firmsWithAdressAndWebsite = document.getElementsByClassName('Nv2PK tH5CWc THOPZb ');
console.log(firmsWithAdress);
console.log(firmsWithAdressAndWebsite);
*/
