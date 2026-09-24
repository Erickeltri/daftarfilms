const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema(
  {
    judul: {
      type: String,
      required: true,
      trim: true
    },
    gambar: {
      type: String, // URL Gambar
      required: true,
      trim: true
    },
    trailer: {
      type: String, // URL Trailer
      required: true,
      trim: true
    },
    deskripsi: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Film', filmSchema);