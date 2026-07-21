import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Star, Clock, Calendar } from 'lucide-react'
import { useAsync } from '../hooks/useAsync'
import { getDetails, backdrop, poster } from '../api/tmdb'
import VideoPlayer from '../components/VideoPlayer'
import MediaRow from '../components/MediaRow'

const TABS = ['Overview', 'Images', 'Videos']

export default function Details() {
  const { mediaType, id } = useParams()
  const { data: item, loading, error } = useAsync(() => getDetails(mediaType, id), [mediaType, id])
  const [tab, setTab] = useState('Overview')
  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)

  if (loading) {
    return <div className="pt-24 px-4 sm:px-10 text-mist">Loading…</div>
  }
  if (error || !item) {
    return (
      <div className="pt-24 px-4 sm:px-10 text-center">
        <p className="text-paper font-semibold mb-1">Couldn't load this title.</p>
        <p className="text-mist text-sm">{error?.message}</p>
      </div>
    )
  }

  const title = item.title || item.name
  const date = item.release_date || item.first_air_date
  const runtime = item.runtime || item.episode_run_time?.[0]
  const trailer = item.videos?.results?.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  )
  const cast = item.credits?.cast?.slice(0, 10) || []
  const backdrops = item.images?.backdrops?.slice(0, 9) || []

  return (
    <div className="pb-16">
      {/* Backdrop header */}
      <div className="relative h-[38vh] min-h-[260px] w-full overflow-hidden">
        <img
          src={backdrop(item.backdrop_path)}
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 -mt-24 sm:-mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={poster(item.poster_path)}
            alt={title}
            className="w-40 sm:w-56 rounded-lg shadow-2xl ring-1 ring-white/10 shrink-0 mx-auto md:mx-0"
          />

          <div className="flex-1 pt-4 md:pt-16">
            <h1 className="font-display text-3xl sm:text-5xl tracking-wide text-paper mb-2">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-mist mb-4">
              {item.vote_average > 0 && (
                <span className="flex items-center gap-1 text-marquee font-semibold">
                  <Star className="w-4 h-4 fill-marquee" /> {item.vote_average.toFixed(1)}
                </span>
              )}
              {date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {date.slice(0, 4)}
                </span>
              )}
              {runtime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {runtime} min
                </span>
              )}
              {item.genres?.map((g) => (
                <span key={g.id} className="px-2 py-0.5 rounded-full bg-surface border border-white/10">
                  {g.name}
                </span>
              ))}
            </div>
            <p className="text-paper/90 max-w-2xl leading-relaxed">{item.overview}</p>
          </div>
        </div>

        {/* TV season/episode selector */}
        {mediaType === 'tv' && item.seasons?.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <label className="text-sm text-mist">Season</label>
            <select
              value={season}
              onChange={(e) => setSeason(Number(e.target.value))}
              className="bg-surface border border-white/10 rounded-md px-3 py-1.5 text-sm text-paper"
            >
              {item.seasons
                .filter((s) => s.season_number > 0)
                .map((s) => (
                  <option key={s.id} value={s.season_number}>
                    {s.name}
                  </option>
                ))}
            </select>
            <label className="text-sm text-mist ml-2">Episode</label>
            <input
              type="number"
              min={1}
              value={episode}
              onChange={(e) => setEpisode(Number(e.target.value))}
              className="w-20 bg-surface border border-white/10 rounded-md px-3 py-1.5 text-sm text-paper"
            />
          </div>
        )}

        {/* Player */}
        <div className="mt-6">
          <VideoPlayer item={item} mediaType={mediaType} season={season} episode={episode} />
        </div>

        {/* Tabs */}
        <div className="mt-10 border-b border-white/10 flex gap-6">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-semibold tracking-wide transition-colors ${
                tab === t ? 'text-marquee border-b-2 border-marquee' : 'text-mist hover:text-paper'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="py-6">
          {tab === 'Overview' && (
            <div>
              <h3 className="font-display text-xl tracking-wide mb-4">Cast</h3>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {cast.map((c) => (
                  <div key={c.id} className="shrink-0 w-24 text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-surface mb-2">
                      {c.profile_path && (
                        <img
                          src={poster(c.profile_path, 'w185')}
                          alt={c.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <p className="text-xs font-medium text-paper line-clamp-1">{c.name}</p>
                    <p className="text-[11px] text-mist line-clamp-1">{c.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'Images' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {backdrops.length === 0 && <p className="text-mist text-sm">No images available.</p>}
              {backdrops.map((img, i) => (
                <img
                  key={i}
                  src={backdrop(img.file_path, 'w780')}
                  alt=""
                  className="rounded-lg w-full aspect-video object-cover"
                />
              ))}
            </div>
          )}

          {tab === 'Videos' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {!trailer && <p className="text-mist text-sm">No trailer available.</p>}
              {trailer && (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-6">
        <MediaRow
          title="Similar"
          items={item.similar?.results}
          mediaType={mediaType}
        />
        <MediaRow
          title="Recommendations"
          items={item.recommendations?.results}
          mediaType={mediaType}
        />
      </div>
    </div>
  )
}
