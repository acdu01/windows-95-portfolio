import { create } from 'zustand'

interface MusicStore {
  requestedTrack: string | null
  requestTrack: (trackName: string) => void
  clearRequestedTrack: () => void
}

export const useMusicStore = create<MusicStore>((set) => ({
  requestedTrack: null,
  requestTrack: (trackName) => set({ requestedTrack: trackName }),
  clearRequestedTrack: () => set({ requestedTrack: null }),
}))
