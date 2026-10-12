import mongoose from "mongoose";
const DBURL = process.env.MONGODB_URI || "mongodb+srv://harishbrahme_db_user:EgATonT0D7TumnvX@cluster0.b0l4wmu.mongodb.net/nutriveda";
export const connectDB = async () => {
    await mongoose.connect(DBURL);
    console.log("MongoDB connected");
};