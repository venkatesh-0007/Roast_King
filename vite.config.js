import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Base path dynamically adjusted for Vercel/GitHub Pages
  base: process.env.VERCEL ? '/' : '/Roast_King/',
})
