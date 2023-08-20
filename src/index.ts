import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'express';
import helmet from 'helmet';
import connect from './utils/mongoConnection';
import { errorHandler } from './utils/common.middleware';
import { jobRouter } from './job/job.controller';
import { userRouter } from './user/user.controller';
import { authRouter } from './auth/auth.controller';
import { sessionMiddleware } from './auth/auth.middleware';
import passport from 'passport';

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded());

//session middleware
app.use(sessionMiddleware);
app.use(passport.authenticate('session'));

// routes
app.use('/api/job', jobRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  await connect();
});