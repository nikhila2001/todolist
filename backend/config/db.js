
const mongoose = require('mongoose');
require('dotenv').config();
// dotenv.config();

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

module.exports = connectDB;