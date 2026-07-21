import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PROVIDERS } from '../api/tmdb'

export default function ProvidersRail() {
  const [mediaType, setMediaType] = useState('movie')

  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl tracking-wide text-paper">
            Streaming Providers
          </h2>
          <p className="text-mist text-sm">Browse content from your favorite streaming services</p>
        </div>
        <div className="flex gap-1 bg-surface rounded-full p-1 w-fit">
          {['movie', 'tv'].map((t) => (
            <button
              key={t}
              onClick={() => setMediaType(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                mediaType === t ? 'bg-marquee text-ink' : 'text-mist hover:text-paper'
              }`}
            >
              {t === 'movie' ? 'Movies' : 'TV Shows'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {PROVIDERS.map((p) => (
          <Link
            key={p.id}
            to={`/browse/${mediaType}?provider=${p.id}&providerName=${encodeURIComponent(p.name)}`}
            className="shrink-0 flex items-center gap-2 bg-surface hover:bg-surface2 border border-white/5 hover:border-marquee/40 rounded-xl px-5 py-4 transition-colors"
          >
            <span className="font-display text-lg tracking-wide text-paper">{p.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
