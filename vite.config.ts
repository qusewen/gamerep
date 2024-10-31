import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), ViteImageOptimizer()],

  server: {
    proxy: {
      '/api': {
        target: 'https://server.gamevizor.ru/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, 'api/'),
      },      '/media': {
        target: 'https://server.gamevizor.ru/media',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, 'api/'),
      },
    },
  },
})
