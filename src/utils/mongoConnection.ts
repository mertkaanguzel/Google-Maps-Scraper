import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connect() {
  const uri = process.env.DB_URI as string;

  try {
    await mongoose.connect(uri);
    console.log('DB connected');
  } catch (error) {
    console.error('Could not connect to DB');
    process.exit(1);
  }
}

export default connect;