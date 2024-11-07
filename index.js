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
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use('/api/tickets', require('./routes/ticket'));

// Run the server locally if not on Vercel
if (process.env.NODE_ENV !== 'production') {
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
   });
}

// Export the app for Vercel to use as a serverless function
module.exports = app;
