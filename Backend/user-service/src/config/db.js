const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://unikart_admin:UniKart@123@cluster0.c7vng1l.mongodb.net/?appName=Cluster0");
    console.log("MongoDB connected (User Service)");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
