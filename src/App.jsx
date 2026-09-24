import { Routes, Route } from 'react-router-dom'
import Header from './components/header'
import DaftarFilm from './pages/daftarfilm'
import DetailFilm from './pages/detailfilm'
import LoginFilm from './pages/loginfilm'
import Adminfilm from './pages/Adminfilm'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DaftarFilm />} />
        {/* Jalur detail film berdasarkan ID */}
        <Route path="/detail/:id" element={<DetailFilm />} />
        <Route path="/detail" element={<DetailFilm />} />
        
        {/* Halaman Login & Admin */}
        <Route path="/login" element={<LoginFilm />} />
        <Route path="/admin" element={<Adminfilm />} />
      </Routes>
    </>
  )
}

export default App