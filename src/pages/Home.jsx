import { useAsync } from '../hooks/useAsync'
import {
  getTrending,
  getPopularMovies,
  getPopularTV,
  getTopRatedMovies,
  getTopRatedTV,
  getUpcomingMovies,
  discoverByGenre,
} from '../api/tmdb'
import HeroCarousel from '../components/HeroCarousel'
import MediaRow from '../components/MediaRow'
import ProvidersRail from '../components/ProvidersRail'

const ACTION_GENRE_ID = 28
const COMEDY_TV_GENRE_ID = 35

export default function Home() {
  const trending = useAsync(() => getTrending('all', 'week'), [])
  const popularMovies = useAsync(() => getPopularMovies(), [])
  const popularTV = useAsync(() => getPopularTV(), [])
  const topRatedMovies = useAsync(() => getTopRatedMovies(), [])
  const topRatedTV = useAsync(() => getTopRatedTV(), [])
  const upcoming = useAsync(() => getUpcomingMovies(), [])
  const actionMovies = useAsync(() => discoverByGenre('movie', ACTION_GENRE_ID), [])
  const comedyTV = useAsync(() => discoverByGenre('tv', COMEDY_TV_GENRE_ID), [])

  return (
    <div className="pb-16">
      <HeroCarousel items={trending.data?.results || []} />

      <div className="flex flex-col gap-10 mt-8">
        <MediaRow
          title="Trending Now"
          items={trending.data?.results}
          loading={trending.loading}
        />

        <ProvidersRail />

        <MediaRow
          title="Popular Movies"
          items={popularMovies.data?.results}
          mediaType="movie"
          seeAllTo="/browse/movie?sort=popular"
          loading={popularMovies.loading}
        />
        <MediaRow
          title="Popular TV Shows"
          items={popularTV.data?.results}
          mediaType="tv"
          seeAllTo="/browse/tv?sort=popular"
          loading={popularTV.loading}
        />
        <MediaRow
          title="Top Rated Movies"
          items={topRatedMovies.data?.results}
          mediaType="movie"
          seeAllTo="/browse/movie?sort=top_rated"
          loading={topRatedMovies.loading}
        />
        <MediaRow
          title="Top Rated TV Shows"
          items={topRatedTV.data?.results}
          mediaType="tv"
          seeAllTo="/browse/tv?sort=top_rated"
          loading={topRatedTV.loading}
        />
        <MediaRow
          title="Upcoming Movies"
          items={upcoming.data?.results}
          mediaType="movie"
          seeAllTo="/browse/movie?sort=upcoming"
          loading={upcoming.loading}
        />
        <MediaRow
          title="Action Movies"
          items={actionMovies.data?.results}
          mediaType="movie"
          seeAllTo={`/browse/movie?genre=${ACTION_GENRE_ID}`}
          loading={actionMovies.loading}
        />
        <MediaRow
          title="Comedy Series"
          items={comedyTV.data?.results}
          mediaType="tv"
          seeAllTo={`/browse/tv?genre=${COMEDY_TV_GENRE_ID}`}
          loading={comedyTV.loading}
        />
      </div>
    </div>
  )
}
