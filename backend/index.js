import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
dotenv.config();



const app = express();
const PORT = process.env.PORT || 3001;


app.listen(PORT , () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})