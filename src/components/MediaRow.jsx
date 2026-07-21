import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MediaCard from './MediaCard'

export default function MediaRow({ title, items, mediaType, seeAllTo, loading }) {
  const scrollerRef = useRef(null)

  const scrollBy = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  if (!loading && (!items || items.length === 0)) return null

  return (
    <section className="relative">
      <div className="flex items-end justify-between mb-3 px-4 sm:px-6 lg:px-10">
        <h2 className="font-display text-2xl sm:text-3xl tracking-wide text-paper">
          {title}
        </h2>
        {seeAllTo && (
          <Link
            to={seeAllTo}
            className="text-xs sm:text-sm font-medium text-mist hover:text-marquee transition-colors"
          >
            See all →
          </Link>
        )}
      </div>

      <div className="group/row relative">
        <button
          onClick={() => scrollBy(-1)}
          aria-label={`Scroll ${title} left`}
          className="hidden sm:flex items-center justify-center absolute left-0 top-0 bottom-6 z-10 w-10 bg-gradient-to-r from-ink to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-7 h-7 text-paper" />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x px-4 sm:px-6 lg:px-10 pb-1"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[150px] sm:w-[170px] aspect-[2/3] rounded-lg bg-surface animate-pulse"
                />
              ))
            : items.map((item) => (
                <div key={`${item.id}-${item.media_type || mediaType}`} className="shrink-0 w-[150px] sm:w-[170px]">
                  <MediaCard item={item} mediaType={mediaType} />
                </div>
              ))}
        </div>

        <button
          onClick={() => scrollBy(1)}
          aria-label={`Scroll ${title} right`}
          className="hidden sm:flex items-center justify-center absolute right-0 top-0 bottom-6 z-10 w-10 bg-gradient-to-l from-ink to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-7 h-7 text-paper" />
        </button>
      </div>
    </section>
  )
}
