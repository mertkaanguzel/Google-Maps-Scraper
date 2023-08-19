import { z } from 'zod';
import { job } from '../job/job.types';

const _user = {
  email: z.string({
    required_error: 'email required'
  }).email(),
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

const resume = z.object({
  ..._resume,
  certificates: z.lazy(() => certificate.array()),
  experiences: z.lazy(() => experience.array()),
});

const user = z.object({
  ..._user,
  firstName: z.string(),
  lastName: z.string(),
  resume: resume,
  companies: z.lazy(() => job.array()),
});

type ICertificate = z.infer<typeof certificate>;

type IExperience = z.infer<typeof experience>;

type IResume = z.infer<typeof resume>;

type IUser = z.infer<typeof user>;

export { ICertificate, IExperience, IResume, IUser, _user };


