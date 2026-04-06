# Windows 95 Portfolio

A retro Windows 95-style portfolio built with React + TypeScript + Vite.

It behaves like a mini desktop OS with draggable icons, overlapping windows, a taskbar/start menu, and project folders that open into overview files, PDFs, links, and media.

Live site: [portfolio.annadu.org](https://portfolio.annadu.org/)

## Features

- Windows 95 desktop UI with draggable/resizable windows
- Start bar with active-window controls and clock/date
- File Explorer with project/document/music folders and search
- Project showcase folders with overview text + attached assets (PDF/image)
- Music player window with track selection
- Games hub with Minesweeper and Tic-Tac-Toe
- Settings panel for theme, text-size, and language controls
- English/Chinese UI toggle for desktop labels, tutorial text, project copy, and resume tabs/content

## Tech Stack

- React 19
- TypeScript
- Vite
- Zustand
- `@react95/core` and `@react95/icons`

## Run Locally

```bash
npm install
npm run dev
```

Open `Settings` on the desktop to toggle the interface language between English and Chinese.

Build for production:

```bash
npm run build
npm run preview
```

## Project Structure

- `src/App.tsx`: desktop layout and window wiring
- `src/component/`: windows/components (Explorer, Resume, Music, Games, Settings, project viewers)
- `src/store/`: Zustand state stores
- `src/assets/`: desktop icons, wallpaper, and project assets
- `public/music/`: playable audio files

## Credits

- [Code with Ali](https://www.youtube.com/watch?v=NXXw5sYg71I) for inspiration
- [aconfuseddragon](https://aconfuseddragon.itch.io/windows-95-plus-1) for icon set/colors
- [robokoboto](https://wall.alphacoders.com/big.php?i=964425) for wallpaper source

## To Do

- update dates
