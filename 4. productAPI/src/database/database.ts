import mongoose from "mongoose";
import config from "config";

const connectDB = async() => {
    try {
        const db: string = config.get('db');
        await mongoose.connect(db);
        console.log('MongoDB Connected!');
        console.log("Connected to DB:", mongoose.connection.name);
    } catch (error) {
        console.error('MongoDB Connection Failed', error);
        process.exit(1);
    }
};

export default connectDB;