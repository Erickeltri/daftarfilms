const express = require('express')
const router = express.Router()
const Film = require('../models/Film')

// GET - Ambil semua data film
router.get('/', async (req, res) => {
  try {
    const films = await Film.find()
    res.status(200).json(films)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST - Tambah data film baru
router.post('/', async (req, res) => {
  try {
    const newFilm = new Film(req.body)
    const savedFilm = await newFilm.save()
    res.status(201).json(savedFilm)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT - Update data film
router.put('/:id', async (req, res) => {
  try {
    const updatedFilm = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedFilm)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE - Hapus data film
router.delete('/:id', async (req, res) => {
  try {
    await Film.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Film berhasil dihapus' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router