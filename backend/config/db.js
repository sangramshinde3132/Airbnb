import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB connected sucessfully`);
    } catch (error) {
        console.log(`error ${error} while connecting to the database`);
    }
}

export default connectDB;