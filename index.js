import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js";
import emailRoutes from "./Routes/emailRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Realz server is up and running')
})

app.use('/users', userRoutes);
app.use('/email', emailRoutes);

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