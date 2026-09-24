const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Limit besar untuk upload gambar Base64

// URI MongoDB Atlas langsung terhubung ke database "film"
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://eltridede_db_user:w7awcvS48IT2M6lX@cluster0.n0yi1u3.mongodb.net/film?retryWrites=true&w=majority";

// Koneksi ke MongoDB Atlas
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected!'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Schema & Model Film
const filmSchema = new mongoose.Schema({
  judul: String,
  gambar: String,
  trailer: String,
  deskripsi: String,
});

const Film = mongoose.models.Film || mongoose.model('Film', filmSchema);

// Endpoint API CRUD
app.get('/api/films', async (req, res) => {
  try {
    const films = await Film.find();
    res.status(200).json(films);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/films', async (req, res) => {
  try {
    const newFilm = new Film(req.body);
    await newFilm.save();
    res.status(201).json(newFilm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/films/:id', async (req, res) => {
  try {
    const updated = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/films/:id', async (req, res) => {
  try {
    await Film.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Film berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export Express app untuk Vercel Serverless Function
module.exports = app;
