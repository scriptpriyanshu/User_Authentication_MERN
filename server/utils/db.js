const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI);
  try {
    console.log("connected to MongoDB");
  } catch (error) {
    console.log(`MongoDB connection Error: ${error}`);
  }
};
module.exports = connectDB;
