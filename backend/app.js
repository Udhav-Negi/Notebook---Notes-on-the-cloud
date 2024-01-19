import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import express from 'express';
const app = express()
// const port = process.env.PORT 
const port = 80;

// imports created by me 
import router from './routes/web.js';
import connectDb from './db/connectdb.js';


// Middlewares
app.use(cors()) 
app.use(express.json())
app.use('/api', router)
app.use('/notes', router)

// connecting to database 
connectDb()

app.listen(port, ()=>{
    console.log(`app is running on http://localhost:${port}/api`)
})