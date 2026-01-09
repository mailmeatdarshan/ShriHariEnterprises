import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import flowbite from 'flowbite/plugin'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbite(),
  ],
  server: {
    proxy: {
      "/api/": "http://localhost:5000"
    },
  },
})
