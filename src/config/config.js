import dotenv from 'dotenv';
import mongoose from "mongoose"
dotenv.config();

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("Database Connected Successfully ❤️‍🔥🔥")
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
export default dbConnection

