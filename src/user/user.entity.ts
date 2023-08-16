import { Schema, model } from 'mongoose';
import { IUser } from './user.types';
import { jobSchema } from '../job/job.entity';


const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companies: [jobSchema],
  resume: new Schema({
    certificates: [new Schema({
      name: { type: String, required: true },
      institutionName: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    })],
    experiences: [new Schema({
      companyname: { type: String, required: true },
      title: { type: String, required: true },
      isCurrentEmployee: { type: Boolean, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    })],
  }),
});

const userModel = model<IUser>('User', userSchema);

export default userModel;