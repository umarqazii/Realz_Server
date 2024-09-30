import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Realz server is up and running')
})

mongoose.connect(process.env.MONG_URI)
  .then(() => {
    console.log("MongoDB connection established successfully");
    
    // Start the server after a successful database connection
    app.listen(4000, () => {
      console.log('Server is running on port 4000');
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });