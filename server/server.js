const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to Database
connectDB();

// CORS middleware configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Express json parser
app.use(express.json());

// Routes
// Routes

app.get('/', (req, res) => {
  res.json({
    message: 'JanYatri backend is running!'
  });
});

app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
