const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const filmRoutes = require('../routes/filmRoutes');

const app = express();

// Middleware CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Mengambil URI dari Vercel Environment Variables
const MONGO_URI = process.env.MONGO_URI;

// Fungsi Koneksi MongoDB Atlas
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Terhubung ke MongoDB Cloud (Atlas)');
  } catch (error) {
    console.error('Koneksi MongoDB Gagal:', error);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Route Utama (Cek Status API)
app.get('/', (req, res) => {
  res.send('API Backend Film Berjalan!');
});

// Route API Film
app.use('/api/films', filmRoutes);

module.exports = app;   