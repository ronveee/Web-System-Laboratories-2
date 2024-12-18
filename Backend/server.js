require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts'); // Adjusted to correct relative path

// CORS options
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Add your client's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Include credentials if needed
};

// Express app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors(corsOptions)); // Enable CORS with specified options
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Connect to the database and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Ensure proper MongoDB connection options
    .then(() => {
        app.listen(process.env.PORT || 4000, () => { // Default to 4000 if PORT is not set
            console.log(`Connected to DB and listening on port ${process.env.PORT || 4000}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

    