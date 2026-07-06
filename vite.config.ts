import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// API key is NOT embedded in the bundle.
// Use .env file with VITE_API_KEY for local development.
// In production use a backend proxy to hide the key.
export default defineConfig({
  base: '/raimgaz/',
  plugins: [react()],
})