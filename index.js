// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.log(err));

// Routes
app.use('/api/tickets', require('./routes/ticket'));

// Export the app for Vercel to use as a serverless function
module.exports = app;

// No need to listen on a port for Vercel deployment
