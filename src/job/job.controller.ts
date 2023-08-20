import { NextFunction, Request, Response, Router } from 'express';
import { validateInput } from '../utils/common.middleware';
import { createJobsDto } from './job.dtos';
import { findAll, scrapeAndSaveJobs } from './job.service';
import { isAuthenticated } from '../auth/auth.middleware';

export const jobRouter = Router();

jobRouter.post('/', validateInput(createJobsDto, 'body'), isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await scrapeAndSaveJobs(req.body);
    res.send(jobs);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

jobRouter.get('/', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log({ user: req.user });
    const jobs = await findAll();
    res.send(jobs);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});
