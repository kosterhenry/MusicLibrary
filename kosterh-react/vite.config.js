import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/musics': {
      target: 'http://localhost:3000'
      },
      '/concerts': {
      target: 'http://localhost:5000'
      },
      '/get-lyrics': {
      target: 'http://localhost:5002'
      },
      '/get-artist-info': {
        target: 'http://localhost:5003'
        },
      '/recommendations': {
        target: 'http://localhost:5004'
         }
    }
  }
})


