import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Details from './pages/Details'
import Search from './pages/Search'
import Browse from './pages/Browse'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-paper font-body">
      <div className="grain-overlay" />
      <Navbar />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/title/:mediaType/:id" element={<Details />} />
          <Route path="/browse/:mediaType" element={<Browse />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="*"
            element={
              <div className="pt-32 text-center">
                <p className="font-display text-3xl tracking-wide mb-2">Scene not found</p>
                <p className="text-mist text-sm">Nothing playing at this address.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
