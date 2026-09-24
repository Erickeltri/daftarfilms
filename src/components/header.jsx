import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="navbar">
      <div className="kiri">
        <span className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Daftar Film
        </span>
      </div>
      <div className="kanan">
        <button className="btn" onClick={() => navigate('/login')}>
          LOGIN
        </button>
      </div>
    </header>
  )
}