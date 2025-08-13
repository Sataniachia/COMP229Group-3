import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: '0.0.0.0',
    proxy:{
      '/api/auth/register':{
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/api/auth/login':{
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/api/tasks':{
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      ' /api/tasks/:id':{
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/api/tasks/stats':{
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/api/ping':{
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
  emptyOutDir:true,
  outDir: "../dist/app"
  }
});


