import { create } from "zustand";

type WindowPosition = { x: number; y: number }

interface WindowStore {
  openWindows: string[];
  windowStack: string[];
  windowPositions: Record<string, WindowPosition | undefined>;
  openWindow: (title: string, position?: WindowPosition) => void;
  closeWindow: (title: string) => void;
  isWindowOpen: (title: string) => boolean;
  getWindowPosition: (title: string) => WindowPosition | undefined;
  bringToFront: (title: string) => void;
  getWindowZIndex: (title: string) => number;
}

export const useWindowsStore = create<WindowStore>((set, get) => ({
  openWindows: [],
  windowStack: [],
  windowPositions: {},
  openWindow: (title, position) =>
    set((state) => ({
      openWindows: [...new Set([...state.openWindows, title])],
      windowStack: [...state.windowStack.filter((w) => w !== title), title],
      windowPositions: position
        ? { ...state.windowPositions, [title]: position }
        : state.windowPositions,
    })),
  closeWindow: (title) =>
    set((state) => ({
      openWindows: state.openWindows.filter((w) => w !== title),
      windowStack: state.windowStack.filter((w) => w !== title),
    })),
  isWindowOpen: (title) => get().openWindows.includes(title),
  getWindowPosition: (title) => get().windowPositions[title],
  bringToFront: (title) =>
    set((state) => {
      if (!state.openWindows.includes(title)) return state
      return {
        ...state,
        windowStack: [...state.windowStack.filter((w) => w !== title), title],
      }
    }),
  getWindowZIndex: (title) => {
    const stack = get().windowStack
    const index = stack.indexOf(title)
    if (index === -1) return 30
    return 30 + index
  },
}));
