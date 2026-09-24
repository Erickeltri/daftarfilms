const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  gambar: { type: String },
  trailer: { type: String },
  deskripsi: { type: String }
});

module.exports = mongoose.models.Film || mongoose.model('Film', filmSchema);