// Generated by ts-to-zod
import { z } from 'zod';
import { _location } from './job.types';

export const createJobsDto = z.object({
  ..._location,
  limit: z.number(),
  term: z.string(),
})
  .strict();

export type createJobsInput = z.infer<typeof createJobsDto>;