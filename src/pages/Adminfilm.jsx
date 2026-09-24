import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Adminfilm() {
  const navigate = useNavigate()
  
  // State Data Film
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  
  // State Modal Tambah Film
  const [showModal, setShowModal] = useState(false)
  const [judul, setJudul] = useState('')
  const [gambar, setGambar] = useState('')
  const [trailer, setTrailer] = useState('')
  const [deskripsi, setDeskripsi] = useState('')

  const API_URL = 'https://daftarfilms.vercel.app/api/films'

  // 1. Ambil Data Semua Film dari Vercel
  const fetchFilms = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setFilms(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Gagal mengambil data film:', err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchFilms()
  }, [])

  // 2. Tambah Film Baru (POST ke Vercel)
  const handleTambahFilm = (e) => {
    e.preventDefault()

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ judul, gambar, trailer, deskripsi })
    })
      .then((res) => res.json())
      .then(() => {
        alert('Film berhasil ditambahkan!')
        setJudul('')
        setGambar('')
        setTrailer('')
        setDeskripsi('')
        setShowModal(false)
        fetchFilms() // Refresh tabel
      })
      .catch((err) => console.error('Gagal menambah film:', err))
  }

  // 3. Hapus Film (DELETE ke Vercel)
  const handleHapusFilm = (id) => {
    if (window.confirm('Yakin ingin menghapus film ini?')) {
      fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => {
          alert('Film berhasil dihapus!')
          fetchFilms() // Refresh tabel
        })
        .catch((err) => console.error('Gagal menghapus film:', err))
    }
  }

  return (
    <>
      {/* Header Admin sesuai Sketsa Kertas */}
      <header className="navbar">
        <div className="kiri">
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Admin</h1>
        </div>
        <div className="kanan">
          <button className="btn" onClick={() => navigate('/')}>
            LOGOUT
          </button>
        </div>
      </header>

      <main className="isi">
        {/* Tombol Tambah Film */}
        <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
          <button className="btn btn-utama" onClick={() => setShowModal(true)}>
            + Tambah
          </button>
        </div>

        {/* Tabel Data Film */}
        {loading ? (
          <div style={{ textAlign: 'center', color: '#fff', margin: '2rem 0' }}>
            Loading data film...
          </div>
        ) : (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'var(--putih)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <thead>
              <tr style={{ background: 'var(--tepi)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem', border: '1px solid var(--garis)' }}>Judul</th>
                <th style={{ padding: '0.75rem', border: '1px solid var(--garis)' }}>Gambar</th>
                <th style={{ padding: '0.75rem', border: '1px solid var(--garis)' }}>Trailer</th>
                <th style={{ padding: '0.75rem', border: '1px solid var(--garis)' }}>Deskripsi</th>
                <th style={{ padding: '0.75rem', border: '1px solid var(--garis)', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {films.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '1rem', textAlign: 'center' }}>
                    Belum ada data film.
                  </td>
                </tr>
              ) : (
                films.map((film) => (
                  <tr key={film._id}>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--garis)' }}>{film.judul}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--garis)' }}>
                      <img
                        src={film.gambar}
                        alt={film.judul}
                        style={{ width: '70px', height: '45px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--garis)', fontSize: '0.8rem' }}>
                      {film.trailer}
                    </td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--garis)', fontSize: '0.8rem' }}>
                      {film.deskripsi}
                    </td>
                    <td style={{ padding: '0.75rem', border: '1px solid var(--garis)', textAlign: 'center' }}>
                      <button
                        className="btn"
                        style={{ borderColor: 'red', color: 'red' }}
                        onClick={() => handleHapusFilm(film._id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Modal Pop-up Form Tambah Film */}
        {showModal && (
          <dialog open>
            <h2>Tambah Film</h2>
            <form onSubmit={handleTambahFilm}>
              <label className="field">
                Judul Film
                <input
                  type="text"
                  placeholder="Masukkan judul film"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  required
                />
              </label>

              <label className="field">
                URL Gambar
                <input
                  type="url"
                  placeholder="https://..."
                  value={gambar}
                  onChange={(e) => setGambar(e.target.value)}
                  required
                />
              </label>

              <label className="field">
                URL Trailer
                <input
                  type="url"
                  placeholder="https://..."
                  value={trailer}
                  onChange={(e) => setTrailer(e.target.value)}
                  required
                />
              </label>

              <label className="field">
                Deskripsi
                <textarea
                  placeholder="Masukkan deskripsi ringkas"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  required
                />
              </label>

              <div className="aksi">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-utama">
                  Simpan
                </button>
              </div>
            </form>
          </dialog>
        )}
      </main>
    </>
  )
}