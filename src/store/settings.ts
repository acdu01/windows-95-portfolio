import { create } from 'zustand'

export type WallpaperMode = 'image' | 'classic_blue'
export type Language = 'en' | 'zh'

interface SettingsStore {
  textSize: number
  iconSize: number
  wallpaperMode: WallpaperMode
  language: Language
  setTextSize: (size: number) => void
  setIconSize: (size: number) => void
  setWallpaperMode: (mode: WallpaperMode) => void
  setLanguage: (language: Language) => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  textSize: 14,
  iconSize: 32,
  wallpaperMode: 'image',
  language: 'en',
  setTextSize: (size) => set({ textSize: Math.max(12, Math.min(20, size)) }),
  setIconSize: (size) => set({ iconSize: Math.max(24, Math.min(48, size)) }),
  setWallpaperMode: (mode) => set({ wallpaperMode: mode }),
  setLanguage: (language) => set({ language }),
}))
