import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'express';
import helmet from 'helmet';
import connect from './utils/mongoConnection';
import { errorHandler } from './utils/common.middleware';
import { jobRouter } from './job/job.controller';

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded());
// routes
app.use('/api/job', jobRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  await connect();
});