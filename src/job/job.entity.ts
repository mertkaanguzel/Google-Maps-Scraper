import { Schema, model } from 'mongoose';

interface ILocation {
  latitude: string;
  longitude: string;
}

interface IJob {
  name: string;
  location: ILocation;
  city?: string;
  website?: string;
}
/*
interface JobDocument extends IJob, Document {
  createdAt: Date;
  updatedAt: Date;
}
*/
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