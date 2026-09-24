import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Adminfilm() {
  const [films, setFilms] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)

  // State Form
  const [judul, setJudul] = useState('')
  const [gambar, setGambar] = useState('')
  const [trailer, setTrailer] = useState('')
  const [deskripsi, setDeskripsi] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    // Proteksi halaman admin
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      navigate('/login')
      return
    }
    fetchFilms()
  }, [navigate])

  const fetchFilms = () => {
    fetch('/api/films')
      .then((res) => res.json())
      .then((data) => setFilms(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Gagal mengambil data:', err))
  }

  const handleOpenModal = (film = null) => {
    if (film) {
      setEditId(film._id)
      setJudul(film.judul || '')
      setGambar(film.gambar || '')
      setTrailer(film.trailer || '')
      setDeskripsi(film.deskripsi || '')
    } else {
      setEditId(null)
      setJudul('')
      setGambar('')
      setTrailer('')
      setDeskripsi('')
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditId(null)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file maksimal 2MB!')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setGambar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { judul, gambar, trailer, deskripsi }
    const url = editId ? `/api/films/${editId}` : '/api/films'
    const method = editId ? 'PUT' : 'POST'

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Gagal menyimpan data')
        return res.json()
      })
      .then(() => {
        alert(editId ? 'Film berhasil diperbarui!' : 'Film berhasil ditambahkan!')
        handleCloseModal()
        fetchFilms()
      })
      .catch((err) => alert(err.message))
  }

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus film ini?')) {
      fetch(`/api/films/${id}`, { method: 'DELETE' })
        .then(() => fetchFilms())
        .catch((err) => console.error('Gagal menghapus:', err))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    navigate('/login')
  }

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Kelola Daftar Film</h2>
        <div>
          <button className="btn" style={{ marginRight: '10px' }} onClick={() => handleOpenModal()}>
            + Tambah
          </button>
          <button className="btn" style={{ background: '#e53e3e' }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Tabel Data Film */}
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #444' }}>
            <th style={{ padding: '10px' }}>Judul</th>
            <th style={{ padding: '10px' }}>Gambar</th>
            <th style={{ padding: '10px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {films.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                Belum ada data film.
              </td>
            </tr>
          ) : (
            films.map((item) => (
              <tr key={item._id} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '10px' }}>{item.judul}</td>
                <td style={{ padding: '10px' }}>
                  {item.gambar && <img src={item.gambar} alt={item.judul} style={{ width: '50px', height: '70px', objectFit: 'cover' }} />}
                </td>
                <td style={{ padding: '10px' }}>
                  <button className="btn" style={{ marginRight: '5px', padding: '4px 8px' }} onClick={() => handleOpenModal(item)}>
                    Edit
                  </button>
                  <button className="btn" style={{ background: '#e53e3e', padding: '4px 8px' }} onClick={() => handleDelete(item._id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal Popup Form */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#1a202c', padding: '2rem', borderRadius: '8px', width: '400px', maxWidth: '90%' }}>
            <h3>{editId ? 'Edit Film' : 'Tambah Film'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Judul Film</label>
                <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Upload Foto Gambar</label>
                <input type="file" accept="image/*" onChange={handleFileChange} required={!editId} style={{ width: '100%', marginTop: '4px' }} />
                {gambar && <img src={gambar} alt="Preview" style={{ width: '80px', marginTop: '10px', borderRadius: '4px' }} />}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>URL Trailer (YouTube Embed)</label>
                <input type="url" value={trailer} onChange={(e) => setTrailer(e.target.value)} placeholder="https://www.youtube.com/embed/..." style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Deskripsi</label>
                <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows="3" style={{ width: '100%', padding: '8px', marginTop: '4px' }}></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={handleCloseModal} style={{ padding: '8px 16px', background: '#718096', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Batal
                </button>
                <button type="submit" style={{ padding: '8px 16px', background: '#3182ce', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Adminfilm