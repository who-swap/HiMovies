import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import {
  getPopularMovies,
  getPopularTV,
  getTopRatedMovies,
  getTopRatedTV,
  getUpcomingMovies,
  discoverByGenre,
  discoverByProvider,
  discoverByLanguage,
} from '../api/tmdb'
import MediaCard from '../components/MediaCard'

const REGION_LANGUAGE = { hollywood: 'en', bollywood: 'hi' }

function resolveFetcher({ mediaType, sort, genre, provider, region }) {
  if (provider) return (page) => discoverByProvider(mediaType, provider, 'US', page)
  if (region && REGION_LANGUAGE[region])
    return (page) => discoverByLanguage(mediaType, REGION_LANGUAGE[region], page)
  if (genre) return (page) => discoverByGenre(mediaType, genre, page)
  if (sort === 'top_rated')
    return (page) => (mediaType === 'movie' ? getTopRatedMovies(page) : getTopRatedTV(page))
  if (sort === 'upcoming' && mediaType === 'movie') return (page) => getUpcomingMovies(page)
  return (page) => (mediaType === 'movie' ? getPopularMovies(page) : getPopularTV(page))
}

export default function Browse() {
  const { mediaType } = useParams()
  const [params] = useSearchParams()
  const [page, setPage] = useState(1)

  const sort = params.get('sort')
  const genre = params.get('genre')
  const provider = params.get('provider')
  const providerName = params.get('providerName')
  const region = params.get('region')

  const fetcher = resolveFetcher({ mediaType, sort, genre, provider, region })
  const { data, loading } = useAsync(() => fetcher(page), [mediaType, sort, genre, provider, region, page])

  const heading = providerName
    ? `${providerName} — ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`
    : region
    ? `${region[0].toUpperCase()}${region.slice(1)} ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`
    : sort === 'top_rated'
    ? `Top Rated ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`
    : sort === 'upcoming'
    ? 'Upcoming Movies'
    : `Popular ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
      <h1 className="font-display text-3xl sm:text-4xl tracking-wide mb-6">{heading}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
        {loading &&
          Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] rounded-lg bg-surface animate-pulse" />
          ))}
        {!loading &&
          data?.results?.map((item) => (
            <MediaCard key={item.id} item={item} mediaType={mediaType} />
          ))}
      </div>

      {!loading && data?.results?.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-md bg-surface disabled:opacity-40 text-sm font-medium hover:bg-surface2 transition-colors"
          >
            Previous
          </button>
          <span className="text-mist text-sm">
            Page {page} of {Math.min(data?.total_pages || 1, 500)}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-md bg-surface text-sm font-medium hover:bg-surface2 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
