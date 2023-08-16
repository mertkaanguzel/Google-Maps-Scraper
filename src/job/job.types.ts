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

export const job = z.object({
  ..._job,
  location: z.object({
    ..._location,
  }),
})
  .strict();

export type IJob = z.infer<typeof job>;