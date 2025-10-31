import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MovieDB3/',  // 👈 must match your repo name exactly (case-sensitive)
  plugins: [react()],
})

