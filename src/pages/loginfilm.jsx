import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginFilm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
  e.preventDefault()

  // Ambil nilai dari Environment Variables Vite atau gunakan fallback default
  const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'admin'
  const ADMIN_PWD = import.meta.env.VITE_ADMIN_PWD || 'w7awcvS48IT2M61X'

  if (username === ADMIN_USER && password === ADMIN_PWD) {
    // Simpan status login di localStorage agar halaman Admin tidak terpental
    localStorage.setItem('isAdmin', 'true')
    alert('Login berhasil!')
    navigate('/admin')
  } else {
    alert('Username atau kata sandi salah!')
  }
}

  return (
    <dialog open>
      <h2>Login</h2>
      <p className="sub">Masuk untuk mengelola film.</p>

      <form onSubmit={handleLogin}>
        <label className="field">
          Username
          <input 
            type="text" 
            placeholder="Masukkan username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus 
            required
          />
        </label>

        <label className="field">
          Kata sandi
          <input 
            type="password" 
            placeholder="Masukkan kata sandi" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <div className="aksi">
          <button type="button" className="btn" onClick={() => navigate('/')}>
            Batal
          </button>
          <button type="submit" className="btn btn-utama">
            Masuk
          </button>
        </div>
      </form>
    </dialog>
  )
}