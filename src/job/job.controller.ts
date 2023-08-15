import { NextFunction, Request, Response, Router } from 'express';
import { findAll, scrapeAndSaveJobs } from './job.service';

export const jobRouter = Router();

jobRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    const jobs = await scrapeAndSaveJobs(req.body);
    res.send(jobs);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

jobRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await findAll();
    res.send(jobs);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});
