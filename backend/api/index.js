const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' })) // Limit diperbesar untuk upload Base64 gambar

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err))

// Schema & Model Film
const filmSchema = new mongoose.Schema({
  judul: String,
  gambar: String,
  trailer: String,
  deskripsi: String,
})
const Film = mongoose.models.Film || mongoose.model('Film', filmSchema)

// Routes
app.get('/api/films', async (req, res) => {
  try {
    const films = await Film.find()
    res.status(200).json(films)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/films', async (req, res) => {
  try {
    const newFilm = new Film(req.body)
    await newFilm.save()
    res.status(201).json(newFilm)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.put('/api/films/:id', async (req, res) => {
  try {
    const updated = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.delete('/api/films/:id', async (req, res) => {
  try {
    await Film.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PENTING: Export app untuk Vercel Serverless Function
module.exports = app