import { Schema, model } from 'mongoose';
import { ICertificate, IExperience, IResume, IUser } from './user.types';
import { jobSchema } from '../job/job.entity';

const certificateSchema = new Schema<ICertificate>({
  name: { type: String, required: true },
  institutionName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const experienceSchema = new Schema<IExperience>({
  companyName: { type: String, required: true },
  title: { type: String, required: true },
  isCurrentEmployee: { type: Boolean, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const resumeSchema = new Schema<IResume>({
  certificates: [certificateSchema],
  experiences: [experienceSchema],
});

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companies: [jobSchema],
  resume: resumeSchema,
});

const userModel = model<IUser>('User', userSchema);

export default userModel;