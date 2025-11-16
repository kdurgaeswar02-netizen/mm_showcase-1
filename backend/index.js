require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const faqRoutes = require('./routes/faqs');
const reviewRoutes = require('./routes/reviews');
const uploadRoutes = require('./routes/upload');
const sliderRoutes = require('./routes/slider'); // Add this line

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));

connectDB()
  .then(() => {
    console.log('MongoDB connected');
    seedAdmin();
  })
  .catch((err) => console.error('DB connect error', err));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/slider', sliderRoutes); // Add this line

app.get('/api/ping', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running on port', port));
