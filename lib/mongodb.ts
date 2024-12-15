import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const uri = process.env.MONGODB_URI!;
    const db = await mongoose.connect(uri);

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
