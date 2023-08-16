import { z } from 'zod';
import { job } from '../job/job.types';

const _user = {
  email: z.string({
    required_error: 'email required'
  }).email(),
  firstName: z.string({
    required_error: 'firstName required'
  }),
  lastName: z.string({
    required_error: 'lastName required'
  }),
};

const _resume = {
  skills: z.string().array(),
};

const _certificate = {
  name: z.string(),
  institutionName: z.string(),
  startDate: z.date(),
  endDate: z.date(),
};

const _experience = {
  companyName: z.string(),
  title: z.string(),
  isCurrentEmployee: z.boolean(),
  startDate: z.date(),
  endDate: z.date().optional(),
};

const certificate = z.object({
  ..._certificate,
});

const experience = z.object({
  ..._experience,
});

const user = z.object({
  ..._user,
  resume: z.object({
    ..._resume,
    certificates: z.lazy(() => certificate.array()),
    experiences: z.lazy(() => experience.array()),
  }),
  companies: z.lazy(() => job.array()),
});


export type IUser = z.infer<typeof user>;


