import { create } from 'zustand'

export type WallpaperMode = 'image' | 'pink_sky' | 'classic_blue'

interface SettingsStore {
  textSize: number
  wallpaperMode: WallpaperMode
  setTextSize: (size: number) => void
  setWallpaperMode: (mode: WallpaperMode) => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  textSize: 14,
  wallpaperMode: 'image',
  setTextSize: (size) => set({ textSize: Math.max(12, Math.min(20, size)) }),
  setWallpaperMode: (mode) => set({ wallpaperMode: mode }),
}))
