import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {

    const uri = process.env.MONGO_URI || 'mongodb://root:password@localhost:27017/staging?authSource=admin';

    await mongoose.connect(uri);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
