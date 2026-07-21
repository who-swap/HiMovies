import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import { useAsync } from '../hooks/useAsync'
import { searchMulti } from '../api/tmdb'
import MediaCard from '../components/MediaCard'

export default function Search() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const q = params.get('q') || ''
  const [input, setInput] = useState(q)

  const { data, loading } = useAsync(() => {
    if (!q) return Promise.resolve({ results: [] })
    return searchMulti(q)
  }, [q])

  const results = (data?.results || []).filter(
    (r) => r.media_type === 'movie' || r.media_type === 'tv'
  )

  const submit = (e) => {
    e.preventDefault()
    if (input.trim()) navigate(`/search?q=${encodeURIComponent(input.trim())}`)
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
      <h1 className="font-display text-3xl sm:text-4xl tracking-wide mb-6">Search</h1>

      <form onSubmit={submit} className="relative max-w-xl mb-8">
        <SearchIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a movie or TV show…"
          className="w-full bg-surface border border-white/10 rounded-full pl-12 pr-4 py-3 text-paper placeholder:text-mist focus:border-marquee/60 focus:outline-none"
          autoFocus
        />
      </form>

      {loading && q && <p className="text-mist">Searching…</p>}

      {!loading && q && results.length === 0 && (
        <p className="text-mist">No results for "{q}". Check your spelling and try again.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
        {results.map((item) => (
          <MediaCard key={`${item.media_type}-${item.id}`} item={item} />
        ))}
      </div>
    </div>
  )
}
