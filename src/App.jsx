import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import DaftarFilm from './pages/daftarfilm'
import DetailFilm from './pages/detailfilm'
import LoginFilm from './pages/Loginfilm'
import Adminfilm from './pages/Adminfilm'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DaftarFilm />} />
        {/* Jalur untuk /detail/1, /detail/2, dst */}
        <Route path="/detail/:id" element={<DetailFilm />} />
        {/* Tambahkan jalur ini agar /detail biasa juga bisa dibuka */}
        <Route path="/detail" element={<DetailFilm />} />
        <Route path="/login" element={<LoginFilm />} />
        <Route path="/admin" element={<Adminfilm />} />
      </Routes>
    </>
  )
}

export default App