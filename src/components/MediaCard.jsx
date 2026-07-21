import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { poster } from '../api/tmdb'

export default function MediaCard({ item, mediaType }) {
  const type = mediaType || item.media_type || (item.first_air_date ? 'tv' : 'movie')
  const title = item.title || item.name
  const date = item.release_date || item.first_air_date
  const year = date ? date.slice(0, 4) : null
  const img = poster(item.poster_path)

  return (
    <Link
      to={`/title/${type}/${item.id}`}
      className="group relative block w-full snap-start"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-surface ring-1 ring-white/5 group-hover:ring-marquee/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-glow">
        {img ? (
          <img
            src={img}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-mist text-xs px-3 text-center">
            {title}
          </div>
        )}
        <div className="absolute inset-0 poster-shine opacity-0 group-hover:opacity-100 transition-opacity" />
        {item.vote_average > 0 && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-ink/80 backdrop-blur rounded px-1.5 py-0.5 text-[11px] font-semibold">
            <Star className="w-3 h-3 fill-marquee text-marquee" />
            {item.vote_average.toFixed(1)}
          </div>
        )}
      </div>
      <p className="mt-2 text-sm font-medium text-paper line-clamp-1 group-hover:text-marquee transition-colors">
        {title}
      </p>
      {year && <p className="text-xs text-mist">{year}</p>}
    </Link>
  )
}
