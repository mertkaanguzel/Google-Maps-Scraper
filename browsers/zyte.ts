import puppeteer from 'zyte-smartproxy-puppeteer';
import dotenv from 'dotenv';
dotenv.config();

async function browser() {
  return await puppeteer.launch({
    spm_apikey: process.env.ZYTE_APIKEY,
    ignoreHTTPSErrors: true,
    headless: true,
  });
}

export default browser;