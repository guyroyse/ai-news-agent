import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', '')
  const apiPort = env.API_PORT ?? '3000'

  return {
    plugins: [svelte(), tailwindcss()],
    resolve: {
      alias: {
        '@root': path.resolve('./'),
        '@src': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@panels': path.resolve('./src/panels'),
        '@services': path.resolve('./src/services'),
        '@stores': path.resolve('./src/stores')
      }
    },
    server: {
      proxy: {
        '/api': {
          target: `http://localhost:${apiPort}`,
          changeOrigin: true
        }
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    }
  }
})
