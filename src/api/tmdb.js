// Thin wrapper around The Movie Database (TMDB) API.
// Get a free API key at https://www.themoviedb.org/settings/api
// then create a `.env` file (copy `.env.example`) with:
//   VITE_TMDB_API_KEY=your_key_here

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const IMAGE_BASE = 'https://image.tmdb.org/t/p'
export const poster = (path, size = 'w500') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null
export const backdrop = (path, size = 'w1280') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null

async function tmdb(path, params = {}) {
  if (!API_KEY) {
    throw new Error(
      'Missing VITE_TMDB_API_KEY. Add it to a .env file — see .env.example.'
    )
  }
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('api_key', API_KEY)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v)
  })
  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

// ---- Discovery rows -------------------------------------------------

export const getTrending = (mediaType = 'all', window = 'week') =>
  tmdb(`/trending/${mediaType}/${window}`)

export const getPopularMovies = (page = 1) =>
  tmdb('/movie/popular', { page })

export const getPopularTV = (page = 1) =>
  tmdb('/tv/popular', { page })

export const getTopRatedMovies = (page = 1) =>
  tmdb('/movie/top_rated', { page })

export const getTopRatedTV = (page = 1) =>
  tmdb('/tv/top_rated', { page })

export const getUpcomingMovies = (page = 1) =>
  tmdb('/movie/upcoming', { page })

export const discoverByGenre = (mediaType, genreId, page = 1) =>
  tmdb(`/discover/${mediaType}`, { with_genres: genreId, page, sort_by: 'popularity.desc' })

export const discoverByLanguage = (mediaType, language, page = 1) =>
  tmdb(`/discover/${mediaType}`, {
    with_original_language: language,
    page,
    sort_by: 'popularity.desc',
  })

export const discoverByProvider = (mediaType, providerId, region = 'US', page = 1) =>
  tmdb(`/discover/${mediaType}`, {
    with_watch_providers: providerId,
    watch_region: region,
    page,
    sort_by: 'popularity.desc',
  })

// ---- Genres -----------------------------------------------------------

export const getGenres = (mediaType) => tmdb(`/genre/${mediaType}/list`)

// ---- Details ------------------------------------------------------------

export const getDetails = (mediaType, id) =>
  tmdb(`/${mediaType}/${id}`, {
    append_to_response: 'videos,images,credits,recommendations,similar,watch/providers',
  })

// ---- Search ---------------------------------------------------------------

export const searchMulti = (query, page = 1) =>
  tmdb('/search/multi', { query, page, include_adult: false })

// Common streaming provider TMDB IDs (US region) used for the provider rail
export const PROVIDERS = [
  { id: 8, name: 'Netflix', slug: 'netflix' },
  { id: 337, name: 'Disney+', slug: 'disney' },
  { id: 350, name: 'Apple TV+', slug: 'appletv' },
  { id: 9, name: 'Prime Video', slug: 'primevideo' },
  { id: 1899, name: 'Max', slug: 'hbo_max' },
  { id: 15, name: 'Hulu', slug: 'hulu' },
]
