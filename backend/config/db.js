
import mongoose from "mongoose";
import dotenv from 'dotenv'; // to access .env file
dotenv.config();




const db = process.env.MONGO_URI; // acess connection string from .env file
// Method for connecting to the database
const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("MongoDB is connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;