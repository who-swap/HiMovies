import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Menu, X, Clapperboard } from 'lucide-react'

const LINKS = [
  { label: 'Hollywood', to: '/browse/movie?region=hollywood' },
  { label: 'Bollywood', to: '/browse/movie?region=bollywood' },
  { label: 'Anime', to: '/browse/tv?genre=16' },
  { label: 'Movies', to: '/browse/movie' },
  { label: 'TV Shows', to: '/browse/tv' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submitSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/95 backdrop-blur border-b border-white/5' : 'bg-gradient-to-b from-ink/90 to-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <Clapperboard className="w-6 h-6 text-marquee" strokeWidth={2.2} />
          <span className="font-display text-2xl tracking-wide text-paper group-hover:text-gradient-marquee transition-colors">
            REELHOUSE
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive ? 'text-marquee' : 'text-mist hover:text-paper'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="hidden md:flex items-center ml-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search movies & shows"
              className="w-64 bg-surface border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-paper placeholder:text-mist focus:border-marquee/60 focus:outline-none transition-colors"
            />
          </div>
        </form>

        <button
          className="lg:hidden ml-auto text-paper"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ink border-t border-white/5 px-4 pb-4">
          <form onSubmit={submitSearch} className="mt-3 mb-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search movies & shows"
              className="w-full bg-surface border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-paper placeholder:text-mist focus:border-marquee/60 focus:outline-none"
            />
          </form>
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 text-sm font-medium rounded-md ${
                    isActive ? 'text-marquee bg-white/5' : 'text-mist'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
