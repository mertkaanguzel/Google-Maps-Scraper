import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
dotenv.config();

async function browser() {
  return await puppeteer.launch({ headless: false });
}

export default browser;