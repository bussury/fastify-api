import { defineConfig } from 'vite'
import viteVue from '@vitejs/plugin-vue'
import {resolve} from 'path';

const dev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  plugins: [
    viteVue(),
  ],
  // Base build settings, default values
  // for assetsDir and outDir match Vite's defaults
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    minify: !dev,
  },
})