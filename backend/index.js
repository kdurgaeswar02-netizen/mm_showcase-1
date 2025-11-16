require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./scripts/seedAdmin');

const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const apiRoutes = require('./routes/api');

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
app.use('/api/upload', uploadRoutes);
app.use('/api', apiRoutes);

app.get('/api/ping', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running on port', port));
