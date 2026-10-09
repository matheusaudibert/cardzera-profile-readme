import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      // Each page is its own static HTML, so /terms/ and /privacy/ work on any host.
      input: {
        main: path.resolve(__dirname, 'index.html'),
        terms: path.resolve(__dirname, 'terms/index.html'),
        privacy: path.resolve(__dirname, 'privacy/index.html'),
      },
    },
  },
})
