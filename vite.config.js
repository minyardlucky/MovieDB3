import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['moviedb3-production.up.railway.app'], // allow backend host
  },
})

