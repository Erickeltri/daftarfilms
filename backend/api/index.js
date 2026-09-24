const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const filmRoutes = require('../routes/filmRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Menerima file gambar Base64 ukuran besar

// URI MongoDB Atlas (menggunakan Environment Variable atau Fallback URL)
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://eltridede_db_user:w7awcvS48IT2M6lX@cluster0.n0yi1u3.mongodb.net/film?retryWrites=true&w=majority';

// Koneksi ke MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected!'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Mengarahkan endpoint /api/films ke router terpisah
app.use('/api/films', filmRoutes);

// Export Express App untuk Serverless Function Vercel
module.exports = app;