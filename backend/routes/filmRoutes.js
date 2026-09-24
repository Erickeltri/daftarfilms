const express = require('express');
const router = express.Router();
const Film = require('../models/Film');

// 1. GET: Ambil Semua Film
router.get('/', async (req, res) => {
  try {
    const films = await Film.find().sort({ createdAt: -1 });
    res.json(films);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. GET: Ambil Detail Film berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res.status(404).json({ message: 'Film tidak ditemukan' });
    }
    res.json(film);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. POST: Tambah Film Baru
router.post('/', async (req, res) => {
  const { judul, gambar, trailer, deskripsi } = req.body;

  const filmBaru = new Film({
    judul,
    gambar,
    trailer,
    deskripsi
  });

  try {
    const filmDisimpan = await filmBaru.save();
    res.status(201).json(filmDisimpan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. PUT: Update Data Film berdasarkan ID
router.put('/:id', async (req, res) => {
  try {
    const { judul, gambar, trailer, deskripsi } = req.body;
    const filmUpdated = await Film.findByIdAndUpdate(
      req.params.id,
      { judul, gambar, trailer, deskripsi },
      { new: true }
    );
    res.json(filmUpdated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 5. DELETE: Hapus Film berdasarkan ID
router.delete('/:id', async (req, res) => {
  try {
    await Film.findByIdAndDelete(req.params.id);
    res.json({ message: 'Film berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;