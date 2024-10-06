import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://sctg-development.github.io/sentencepiece-js/',
  plugins: [react()],
})
