// database.ts
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING as string);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};


mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log(err.message);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });
  
  // Close the Mongoose connection when the app stops
  process.on('SIGINT', () => {
    mongoose.connection.close();
      console.log('Mongoose connection closed on Application Timeout');
      process.exit(0);
    });


export default connectDB;