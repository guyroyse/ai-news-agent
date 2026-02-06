import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  resolve: {
    alias: {
      '@root': path.resolve('./'),
      '@src': path.resolve('./src'),
      '@components': path.resolve('./src/components'),
      '@panels': path.resolve('./src/panels'),
      '@services': path.resolve('./src/services')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
