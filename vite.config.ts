import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/100-12-TMDB-React-TypeScript/', // ⚠️ Avec le slash à la fin
})