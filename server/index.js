const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require('./routes/auth');
const profilePicture = require('./routes/profilePicture');
const cors = require("cors");

dotenv.config();

const app = express();

// connect to database
connectDB();

// middleware
app.use(cors()); // Enable cors
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile-picture', profilePicture)

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))