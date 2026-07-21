import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = process.env.VITE_APP_REPO_NAME || 'typing-practice'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
})