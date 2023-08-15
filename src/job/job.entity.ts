import { Schema, model } from 'mongoose';
import { IJob } from './job.types';


const jobSchema = new Schema<IJob>({
  name: { type: String, required: true },
  location: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true }
  },
  city: String,
  website: String,
});

const jobModel = model<IJob>('Job', jobSchema);

export default jobModel;