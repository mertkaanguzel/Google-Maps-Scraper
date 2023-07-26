import puppeteer from 'puppeteer-core';
import dotenv from 'dotenv';
dotenv.config();

const url = `wss://chrome.browserless.io?token=${process.env.BLESS_APITOKEN}`;

async function browser() {
  return await puppeteer.connect({
    browserWSEndpoint: url,
  });
}
export default browser;