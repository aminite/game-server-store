import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB")
    } catch(err) {
        console.log(`Failed to connect to db ${err}`)
        process.exit(0);
    }
}

export default connectDB;