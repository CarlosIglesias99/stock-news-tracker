require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const cors = require('cors');

const apiRoutes = require('./apiRoutes');
const fetchAndStoreNews = require('./fetchNews');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
    // Fetch news every hour
    cron.schedule('0 * * * *', fetchAndStoreNews);
    // Initial fetch at startup
    fetchAndStoreNews();
  })
  .catch(err => console.error(err));
