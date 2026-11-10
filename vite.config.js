import { defineConfig } from 'vite';
import { swBuildPlugin } from './src/utils/sw_build.js';

export default defineConfig({
  base: './',
  plugins: [swBuildPlugin()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: 'hidden'
  },
  server: {
    port: 3000,
    open: true
  }
});
