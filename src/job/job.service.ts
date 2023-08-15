import { scrape } from '../utils/scraper';
import { createJobsInput } from './job.dtos';
import jobModel from './job.entity';

async function scrapeAndSaveJobs(args: createJobsInput) {
  const data = await scrape(args);
  await jobModel.insertMany(data);
  return data;
}

async function findAll() {
  const data = await jobModel.find();
  return data;
}



export { scrapeAndSaveJobs, findAll };