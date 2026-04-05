import { useEffect, useRef, useState } from 'react'
import { useMusicStore } from '../store/music'

type Track = {
  title: string
  artist: string
  src: string
  fileName: string
}

const tracks: Track[] = [
  {
    title: "Can't Stop",
    artist: 'Red Hot Chili Peppers',
    src: '/music/red-hot-chili-peppers_can-t-stop.mp3',
    fileName: "Can't Stop.mp3",
  },
  {
    title: 'Seven Nation Army',
    artist: 'The White Stripes',
    src: '/music/seven-nation-army.mp3',
    fileName: 'Seven Nation Army.mp3',
  },
]

export const MUSIC_PLAYER_MIN_WIDTH = 460
export const MUSIC_PLAYER_MIN_HEIGHT = 260 + tracks.length * 40

const formatTime = (value: number): string => {
  if (!Number.isFinite(value)) return '0:00'
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const styles = {
  button: {
    background: '#dfccd4',
    borderTop: '2px solid #f8eef2',
    borderLeft: '2px solid #f8eef2',
    borderRight: '2px solid #9a8790',
    borderBottom: '2px solid #9a8790',
    color: '#352b30',
    fontSize: '12px',
    padding: '4px 10px',
    minWidth: '56px',
    cursor: 'pointer',
  } as React.CSSProperties,
  activeButton: {
    borderTop: '2px solid #8f7c85',
    borderLeft: '2px solid #8f7c85',
    borderRight: '2px solid #f8eef2',
    borderBottom: '2px solid #f8eef2',
    background: '#cfb9c3',
    fontWeight: 700,
  } as React.CSSProperties,
  panel: {
    background: '#dcc8d1',
    borderTop: '2px solid #f6ebf0',
    borderLeft: '2px solid #f6ebf0',
    borderRight: '2px solid #97858d',
    borderBottom: '2px solid #97858d',
    padding: '8px',
  } as React.CSSProperties,
  subPanel: {
    background: '#e5d4db',
    borderTop: '2px solid #9a8790',
    borderLeft: '2px solid #9a8790',
    borderRight: '2px solid #f8eef2',
    borderBottom: '2px solid #f8eef2',
    padding: '8px',
  } as React.CSSProperties,
  disabledButton: {
    color: '#7d6d74',
    background: '#d5c4cc',
    cursor: 'not-allowed',
  } as React.CSSProperties,
} as const

function MusicPlayer() {
  const { requestedTrack, clearRequestedTrack } = useMusicStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [hasLoadError, setHasLoadError] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  const currentTrack = tracks[trackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0)
    const onLoadedMetadata = () => setDuration(audio.duration || 0)
    const onEnded = () => setTrackIndex((prev) => (prev + 1) % tracks.length)
    const onError = () => {
      setHasLoadError(true)
      setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.loop = isLooping
  }, [isLooping])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    setCurrentTime(0)
    setDuration(0)
    setHasLoadError(false)
    audio.load()

    if (isPlaying) {
      void audio.play().catch(() => {
        setIsPlaying(false)
      })
    }
  }, [trackIndex])

  useEffect(() => {
    if (!requestedTrack) return

    const nextTrackIndex = tracks.findIndex(
      (track) =>
        track.fileName.toLowerCase() === requestedTrack.toLowerCase() ||
        track.title.toLowerCase() === requestedTrack.toLowerCase(),
    )

    if (nextTrackIndex >= 0) {
      setTrackIndex(nextTrackIndex)
    }

    clearRequestedTrack()
  }, [clearRequestedTrack, requestedTrack])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  const playPrev = () => setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
  const playNext = () => setTrackIndex((prev) => (prev + 1) % tracks.length)
  const hasMultipleTracks = tracks.length > 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '320px' }}>
      <audio ref={audioRef}>
        <source src={currentTrack.src} type="audio/mpeg" />
      </audio>

      <div style={styles.panel}>
        <div style={{ fontWeight: 700 }}>{currentTrack.title}</div>
        <div style={{ fontSize: '13px' }}>{currentTrack.artist}</div>
      </div>

      <div style={styles.subPanel}>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={Math.min(currentTime, duration || 0)}
          onChange={(event) => {
            const audio = audioRef.current
            if (!audio) return
            const next = Number(event.target.value)
            audio.currentTime = next
            setCurrentTime(next)
          }}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
        {formatTime(currentTime)} / {formatTime(duration)}
        <span>-{formatTime(Math.max(0, duration - currentTime))}</span>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button"
          onClick={playPrev}
          disabled={!hasMultipleTracks}
          style={{ ...styles.button, ...(!hasMultipleTracks ? styles.disabledButton : {}) }}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={togglePlay}
          style={{ ...styles.button, ...(isPlaying ? styles.activeButton : {}) }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          type="button"
          onClick={playNext}
          disabled={!hasMultipleTracks}
          style={{ ...styles.button, ...(!hasMultipleTracks ? styles.disabledButton : {}) }}
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => setIsMuted((value) => !value)}
          style={{ ...styles.button, ...(isMuted ? styles.activeButton : {}) }}
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <button
          type="button"
          onClick={() => setIsLooping((value) => !value)}
          style={{ ...styles.button, ...(isLooping ? styles.activeButton : {}) }}
        >
          Loop
        </button>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', ...styles.subPanel }}>
        Volume
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          style={{ width: '100%' }}
        />
      </label>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {tracks.map((track, index) => (
          <button
            key={track.src}
            type="button"
            onClick={() => setTrackIndex(index)}
            style={{
              ...styles.button,
              textAlign: 'left',
              width: '100%',
              ...(index === trackIndex ? styles.activeButton : {}),
            }}
          >
            {track.title}
          </button>
        ))}
      </div>

      {hasLoadError && (
        <p style={{ color: '#8a0000', margin: 0 }}>
          Could not load this file. Put tracks in `public/music/` and update paths in `MusicPlayer.tsx`.
        </p>
      )}
    </div>
  )
}

export default MusicPlayer
