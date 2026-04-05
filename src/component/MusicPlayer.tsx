import { useEffect, useRef, useState } from 'react'
import { useMusicStore } from '../store/music'

type Track = {
  title: string
  artist: string
  src: string
  fileName: string
}

const musicAssetUrl = (fileName: string) => `${import.meta.env.BASE_URL}music/${fileName}`

const tracks: Track[] = [
  {
    title: "Can't Stop",
    artist: 'Red Hot Chili Peppers',
    src: musicAssetUrl('red-hot-chili-peppers_can-t-stop.mp3'),
    fileName: "Can't Stop.mp3",
  },
  {
    title: 'Seven Nation Army',
    artist: 'The White Stripes',
    src: musicAssetUrl('seven-nation-army.mp3'),
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

const getPlaybackErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  return 'Playback was blocked or failed.'
}

const styles = {
  button: {
    background: 'var(--chrome-button)',
    borderTop: '2px solid var(--chrome-lightest)',
    borderLeft: '2px solid var(--chrome-lightest)',
    borderRight: '2px solid var(--chrome-dark)',
    borderBottom: '2px solid var(--chrome-dark)',
    color: 'var(--chrome-text)',
    fontSize: '12px',
    padding: '4px 10px',
    minWidth: '56px',
    cursor: 'pointer',
  } as React.CSSProperties,
  activeButton: {
    borderTop: '2px solid var(--chrome-button-shadow)',
    borderLeft: '2px solid var(--chrome-button-shadow)',
    borderRight: '2px solid var(--chrome-lightest)',
    borderBottom: '2px solid var(--chrome-lightest)',
    background: 'var(--chrome-button-active)',
    fontWeight: 700,
  } as React.CSSProperties,
  panel: {
    background: 'var(--chrome-material)',
    borderTop: '2px solid var(--chrome-lightest)',
    borderLeft: '2px solid var(--chrome-lightest)',
    borderRight: '2px solid var(--chrome-dark)',
    borderBottom: '2px solid var(--chrome-dark)',
    padding: '8px',
    color: 'var(--chrome-text)',
  } as React.CSSProperties,
  subPanel: {
    background: 'var(--chrome-input-background)',
    borderTop: '2px solid var(--chrome-dark)',
    borderLeft: '2px solid var(--chrome-dark)',
    borderRight: '2px solid var(--chrome-lightest)',
    borderBottom: '2px solid var(--chrome-lightest)',
    padding: '8px',
  } as React.CSSProperties,
  disabledButton: {
    color: 'var(--chrome-text-disabled)',
    background: 'var(--chrome-input-background-disabled)',
    cursor: 'not-allowed',
  } as React.CSSProperties,
} as const

function MusicPlayer() {
  const { requestedTrack, clearRequestedTrack } = useMusicStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const playIntentRef = useRef(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [hasLoadError, setHasLoadError] = useState(false)
  const [playbackError, setPlaybackError] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  const currentTrack = tracks[trackIndex]

  const startPlayback = async (audio: HTMLAudioElement) => {
    try {
      setPlaybackError(null)
      await audio.play()
    } catch (error: unknown) {
      setPlaybackError(getPlaybackErrorMessage(error))
      setIsPlaying(false)
      playIntentRef.current = false
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0)
    const onLoadedMetadata = () => setDuration(audio.duration || 0)
    const onCanPlay = () => {
      setHasLoadError(false)
      setPlaybackError(null)
      if (playIntentRef.current && audio.paused) {
        void startPlayback(audio)
      }
    }
    const onPlay = () => {
      setIsPlaying(true)
      setPlaybackError(null)
      playIntentRef.current = true
    }
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setTrackIndex((prev) => (prev + 1) % tracks.length)
    const onError = () => {
      setHasLoadError(true)
      setIsPlaying(false)
      setPlaybackError('Could not load this track.')
      playIntentRef.current = false
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
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

    const shouldResumePlayback = playIntentRef.current || !audio.paused

    setCurrentTime(0)
    setDuration(0)
    setHasLoadError(false)
    setPlaybackError(null)
    playIntentRef.current = shouldResumePlayback
    audio.pause()
    audio.load()
    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA && playIntentRef.current) {
      void startPlayback(audio)
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
      playIntentRef.current = false
      audio.pause()
      return
    }

    playIntentRef.current = true
    if (audio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      await startPlayback(audio)
      return
    }

    audio.load()
  }

  const playPrev = () => setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
  const playNext = () => setTrackIndex((prev) => (prev + 1) % tracks.length)
  const hasMultipleTracks = tracks.length > 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '320px' }}>
      <audio ref={audioRef} src={currentTrack.src} />

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
          Could not load this track. The file may be missing, unreadable, or requested from the wrong base path.
        </p>
      )}
      {playbackError && !hasLoadError && (
        <p style={{ color: '#8a0000', margin: 0 }}>
          Playback failed: {playbackError}
        </p>
      )}
    </div>
  )
}

export default MusicPlayer
