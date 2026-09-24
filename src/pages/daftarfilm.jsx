import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DaftarFilm() {
  const navigate = useNavigate()
  const [dataFilm, setDataFilm] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://daftarfilms.vercel.app/api/films')
      .then((res) => res.json())
      .then((data) => {
        setDataFilm(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Gagal mengambil data film:', err)
        setLoading(false)
      })
  }, [])

  return (
    <main className="isi">
      <h1>Daftar Film</h1>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#fff', margin: '2rem 0' }}>
          Loading data film...
        </div>
      ) : (
        <section className="grid" id="grid" aria-label="Daftar film">
          {dataFilm.map((film) => (
            <article className="kartu" key={film._id}>
              <img 
                src={film.gambar} 
                alt={film.judul} 
                className="gambar"
                onError={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #4a5f86, #172236)'
                }} 
              />
              <h2>{film.judul}</h2>
              <button 
                type="button" 
                className="btn" 
                onClick={() => navigate(`/detail/${film._id}`)}
              >
                DETAIL &gt;
              </button>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}