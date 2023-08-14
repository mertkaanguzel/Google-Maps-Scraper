import puppeteer from 'puppeteer-core';
import dotenv from 'dotenv';
dotenv.config();

const auth = process.env.BD_USERNAME + ':' +  process.env.BD_PASSWORD;
const url = `wss://${auth}@${process.env.BD_HOST}`;

async function browser() {
  return await puppeteer.connect({
    browserWSEndpoint: url,
  });
}
export default browser;