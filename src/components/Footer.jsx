import { Link } from 'react-router-dom'
import { Clapperboard } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <Clapperboard className="w-5 h-5 text-marquee" />
            <span className="font-display text-xl tracking-wide">REELHOUSE</span>
          </div>
          <p className="text-sm text-mist">
            Discover and organize the movies and shows you want to watch, all in one place.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-paper mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-mist">
            <li><Link to="/" className="hover:text-marquee">Home</Link></li>
            <li><Link to="/search" className="hover:text-marquee">Search</Link></li>
            <li><Link to="/browse/movie" className="hover:text-marquee">Movies</Link></li>
            <li><Link to="/browse/tv" className="hover:text-marquee">TV Shows</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-paper mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-mist">
            <li><a href="#" className="hover:text-marquee">Terms of Service</a></li>
            <li><a href="#" className="hover:text-marquee">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-marquee">Content Removal</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-paper mb-3">Data</h3>
          <p className="text-sm text-mist">
            Movie and show metadata provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>

      <div className="film-strip" />
      <p className="text-center text-xs text-mist py-4">
        © {new Date().getFullYear()} Reelhouse. Built for demonstration purposes.
      </p>
    </footer>
  )
}
