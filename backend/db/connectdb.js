import express from "express";
import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        let uri = process.env.URI || "mongodb://localhost:27017/notesapp"
        await mongoose.connect(uri);
        console.log('connected to mongo db')
    }
    catch (error) 
    {
        console.log(error)    
    }
}

export default connectDb