import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  //base:'/MovieDB3/',
  base: '/', // ✅ local testing base
  plugins: [react()],
})
