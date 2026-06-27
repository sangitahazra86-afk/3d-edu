import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    middlewareMode: false,
  },
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
