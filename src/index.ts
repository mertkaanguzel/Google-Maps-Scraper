import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'express';
import helmet from 'helmet';
import connect from './utils/mongoConnection';

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded());

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  await connect();
});