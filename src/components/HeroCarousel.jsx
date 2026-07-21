import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { backdrop } from '../api/tmdb'

export default function HeroCarousel({ items = [] }) {
  const [index, setIndex] = useState(0)
  const slides = items.slice(0, 8)

  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 7000)
    return () => clearInterval(t)
  }, [slides.length])

  if (slides.length === 0) {
    return (
      <div className="h-[56vh] min-h-[380px] bg-surface animate-pulse rounded-none" />
    )
  }

  const item = slides[index]
  const type = item.media_type || (item.first_air_date ? 'tv' : 'movie')
  const title = item.title || item.name

  return (
    <div className="relative h-[62vh] min-h-[420px] max-h-[680px] w-full overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={backdrop(s.backdrop_path)}
            alt={s.title || s.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/20 to-transparent" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-end sm:items-center">
        <div className="px-4 sm:px-6 lg:px-10 max-w-2xl pb-10 sm:pb-0">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-marquee mb-3">
            TRENDING THIS WEEK
          </span>
          <h1 className="font-display text-4xl sm:text-6xl leading-[0.95] tracking-wide text-paper mb-4 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-mist text-sm sm:text-base line-clamp-3 mb-6 max-w-xl">
            {item.overview}
          </p>
          <div className="flex items-center gap-3">
            <Link
              to={`/title/${type}/${item.id}`}
              className="inline-flex items-center gap-2 bg-marquee text-ink font-semibold px-5 py-2.5 rounded-md hover:bg-marquee2 transition-colors"
            >
              <Play className="w-4 h-4 fill-ink" /> Watch now
            </Link>
            <Link
              to={`/title/${type}/${item.id}`}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-paper font-semibold px-5 py-2.5 rounded-md hover:bg-white/20 transition-colors"
            >
              <Info className="w-4 h-4" /> More info
            </Link>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-ink/50 hover:bg-ink/80 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-paper" />
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-ink/50 hover:bg-ink/80 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-paper" />
          </button>

          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1 rounded-full transition-all ${
                  i === index ? 'w-6 bg-marquee' : 'w-2.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
