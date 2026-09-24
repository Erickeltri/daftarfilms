import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function DetailFilm() {
  const navigate = useNavigate()
  const { id } = useParams() // Mengambil ID MongoDB dari URL (/detail/65f...)
  
  const [film, setFilm] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://daftarfilms.vercel.app/api/films/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFilm(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Gagal mengambil detail film:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="isi" style={{ textAlign: 'center', color: '#fff', marginTop: '5rem' }}>
        Loading detail film...
      </div>
    )
  }

  if (!film) {
    return (
      <div className="isi" style={{ textAlign: 'center', color: '#fff', marginTop: '5rem' }}>
        Film tidak ditemukan
      </div>
    )
  }

  return (
    <>
      <header className="navbar">
        <div className="kiri">
          <button className="btn" onClick={() => navigate('/')}>
            &lt; Kembali
          </button>
        </div>
        <div className="judul-tengah">Detail Film</div>
        <div className="kanan"></div>
      </header>

      <main className="isi halaman-detail">
        <div className="preview">
          <img 
            src={film.gambar} 
            alt={film.judul} 
            className="gambar"
            onError={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #4a5f86, #172236)'
            }}
          />
        </div>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label className="field">
            Judul
            <input 
              type="text" 
              value={film.judul || ''} 
              readOnly
            />
          </label>

          <label className="field">
            Gambar (URL)
            <input 
              type="text" 
              value={film.gambar || ''} 
              readOnly 
            />
          </label>

          <label className="field">
            Trailer (URL)
            <input 
              type="url" 
              value={film.trailer || ''} 
              readOnly 
            />
          </label>

          <label className="field">
            Deskripsi
            <textarea 
              value={film.deskripsi || ''} 
              readOnly 
            />
          </label>

          <div className="aksi">
            <button 
              type="button" 
              className="btn btn-utama" 
              onClick={() => navigate('/')}
            >
              Kembali Ke Daftar
            </button>
          </div>
        </form>
      </main>
    </>
  )
}