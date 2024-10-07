import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sentencepiece-js/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'sentencepiece-js': ['@sctg/sentencepiece-js'],
          'fluentui-react-components': ['@fluentui/react-components'],
        }
      }
    }
  }
});
