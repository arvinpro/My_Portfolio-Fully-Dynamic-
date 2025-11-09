import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://my-portfolio-r5z0.onrender.com'
    }
  },
     base: '/', 
   plugins: [
    tailwindcss(),
  ],
})


