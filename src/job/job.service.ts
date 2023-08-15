import { scrape } from '../utils/scraper';
import { createJobsInput } from './job.dtos';
import jobModel from './job.entity';

async function scrapeAndSaveJobs(args: createJobsInput) {
  const input = args;
  console.log({ input });
  const data = await scrape(input);
  await jobModel.insertMany(data);
  return data;
}

async function findAll() {
  const data = await jobModel.find();
  await jobModel.find();
  return data;
}



export { scrapeAndSaveJobs, findAll };