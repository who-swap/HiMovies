import { useState } from 'react'
import { PlayCircle } from 'lucide-react'

/**
 * ============================================================================
 *  VIDEO PLAYER — INTEGRATION POINT
 * ============================================================================
 *  This component intentionally does NOT connect to any streaming source.
 *  Wire up your own provider/embed/player here.
 *
 *  `item`      → the full TMDB details object for the movie/show
 *  `mediaType` → 'movie' | 'tv'
 *  `season`, `episode` → only relevant when mediaType === 'tv'
 *
 *  Common approaches:
 *   1. <iframe src={yourEmbedUrl(item.id, season, episode)} ... />
 *   2. A self-hosted <video> tag pointing at your own HLS/DASH stream
 *   3. A third-party player SDK (Video.js, hls.js, Plyr, etc.)
 *
 *  Example shape for a "sources" list if you support multiple mirrors:
 *   const sources = [
 *     { label: 'Server 1', url: `https://your-source.example/embed/${mediaType}/${item.id}` },
 *     { label: 'Server 2', url: `https://your-other-source.example/e/${item.id}` },
 *   ]
 * ============================================================================
 */
export default function VideoPlayer({ item, mediaType, season, episode }) {
  const [started, setStarted] = useState(false)

  // TODO: replace with your real source list
  const sources = [
    {
      name:"VIDSRC",
      url: mediaType==="tv"  ? `https://vidsrc.sbs/embed/${mediaType}/${item.id}/${season}/${episode}`  : `https://vidsrc.sbs/embed/${mediaType}/${item.id}`

    }
    ,
    {
      name:"VIDEASY",
      url: `https://player.videasy.net/${mediaType}/${item.id}/${season}/${episode}`
    }
  ]

  // if (!started) {
  //   return (
  //     <button
  //       onClick={() => setStarted(true)}
  //       className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface border border-white/10 flex flex-col items-center justify-center gap-3 group"
  //     >
  //       <img
  //         src={item.backdrop_path ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}` : undefined}
  //         alt=""
  //         className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
  //       />
  //       <PlayCircle className="relative w-16 h-16 text-marquee group-hover:scale-110 transition-transform" />
  //       <span className="relative text-paper font-medium">Play</span>
  //     </button>
  //   )
  // }
  //
  if (sources.length === 0) {
    return (
      <div className="w-full aspect-video rounded-lg bg-surface border border-dashed border-marquee/50 flex flex-col items-center justify-center text-center px-6">
        <p className="text-paper font-semibold mb-1">No video source connected</p>
        <p className="text-mist text-sm max-w-sm">
          Hook up your streaming source in{' '}
          <code className="text-marquee">src/components/VideoPlayer.jsx</code> — swap the empty{' '}
          <code className="text-marquee">sources</code> array for your embed URL(s) or player of choice.
        </p>
      </div>
    )
  }
  // Once you populate `sources`, render your player/iframe here, e.g.:
  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
      <iframe
        src={sources[1].url}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        allow="encrypted-media"
      />
    </div>
  )

  return null
}
