import { z } from 'zod';

export const _location = {
  latitude: z.string({
    required_error: 'latitude required'
  }),
  longitude: z.string({
    required_error: 'longitude required'
  }),
};

const _job = {
  name: z.string({
    required_error: 'name required'
  }),
  city: z.string().optional(),
  website: z.string().url().optional(),
};

const JobSchema = z.object({
  ..._job,
  location: z.object({
    ..._location,
  }),
});

export type IJob = z.infer<typeof JobSchema>;