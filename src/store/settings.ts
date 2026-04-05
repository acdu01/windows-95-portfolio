import { create } from 'zustand'

export type WallpaperMode = 'image' | 'pink_sky' | 'classic_blue'
export type Language = 'en' | 'zh'

interface SettingsStore {
  textSize: number
  wallpaperMode: WallpaperMode
  language: Language
  setTextSize: (size: number) => void
  setWallpaperMode: (mode: WallpaperMode) => void
  setLanguage: (language: Language) => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  textSize: 14,
  wallpaperMode: 'image',
  language: 'en',
  setTextSize: (size) => set({ textSize: Math.max(12, Math.min(20, size)) }),
  setWallpaperMode: (mode) => set({ wallpaperMode: mode }),
  setLanguage: (language) => set({ language }),
}))
