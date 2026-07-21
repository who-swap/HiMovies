# Reelhouse — Movie & TV Discovery Frontend

A MovieFlix-style browsing frontend built with **React (Vite)**, **Tailwind CSS**,
and **React Router**. It pulls real movie/TV metadata, posters, trailers, and
cast info from **TMDB** (The Movie Database) — free to use with your own API key.

The actual video **streaming/playback integration is intentionally left out** —
see "Connecting your streaming source" below.

## What's included

- Home page: hero carousel of trending titles, streaming-provider rail
  (Netflix / Disney+ / Prime Video / etc.), and rows for Popular, Top Rated,
  Upcoming, Action Movies, Comedy Series
- Browse pages: paginated grid by category, genre, provider, or region
  (Hollywood / Bollywood via original language)
- Search page (debounced-free simple search across movies + TV)
- Title details page: backdrop header, cast, image gallery, trailer tab,
  season/episode selector for TV, "Similar" and "Recommendations" rows
- Responsive nav with mobile menu, sticky header on scroll
- A dark "cinema at night" visual identity (near-black background, warm gold
  marquee accent, `Bebas Neue` display type, film-strip perforation divider)

## Getting started

```bash
npm install
cp .env.example .env
```

Then add a free TMDB API key to `.env`:

```
VITE_TMDB_API_KEY=your_key_here
```

Get one at https://www.themoviedb.org/settings/api (instant approval for the
"API Read Access" v3 key).

```bash
npm run dev
```

Visit http://localhost:5173.

## Project structure

```
src/
  api/tmdb.js          TMDB API wrapper (all data fetching lives here)
  components/          Navbar, Footer, HeroCarousel, MediaRow, MediaCard,
                        ProvidersRail, VideoPlayer
  hooks/useAsync.js     small fetch/loading/error hook
  pages/                Home, Browse, Search, Details
```

## Connecting your streaming source

Everything data/UI related is done — the one deliberate gap is playback.
Open `src/components/VideoPlayer.jsx`. It renders a "Play" button and, once
clicked, looks for a `sources` array (currently empty) to decide what to show.

Drop your integration in there, for example:

```jsx
const sources = [
  { label: 'Server 1', url: `https://your-source.example/embed/${mediaType}/${item.id}` },
]
```

then render an `<iframe>`, `<video>` tag, or player SDK using that URL —
there's a commented example already in the file showing the shape. The
component receives the full TMDB `item`, `mediaType` ('movie' | 'tv'), and
`season`/`episode` for TV, so you have everything needed to build your
embed/request URL.

## Notes

- TMDB's discover endpoint is used for genre/provider/region browsing;
  provider IDs for the six rail logos are in `PROVIDERS` in `src/api/tmdb.js`
  if you want to add/remove services.
- "Hollywood" / "Bollywood" filters use TMDB's `with_original_language`
  (`en` / `hi`) as a reasonable approximation — adjust in `Browse.jsx` if you
  want stricter region/language logic.
- No backend/auth/watchlist persistence is included — this is a browsing
  frontend. Add a backend (or something like Supabase/Firebase) if you want
  accounts, watchlists, or continue-watching state.
