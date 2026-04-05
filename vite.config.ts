import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/windows-95-portfolio/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('@react95')) return 'react95'
          if (id.includes('react-dom')) return 'react-dom'
          if (id.includes('react')) return 'react'
          if (id.includes('zustand')) return 'zustand'

          return 'vendor'
        },
      },
    },
  },
})
