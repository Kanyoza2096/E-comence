import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ghPages } from 'vite-plugin-gh-pages';

export default defineConfig({
  plugins: [
    react(),
    ghPages({
      branch: 'gh-pages',
      dotfiles: true // Includes .nojekyll file
    })
  ],
  
  // Base URL must match your repository name exactly
  base: '/E-comence/',

  // Production build settings
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          charts: ['recharts']
        },
        // Optimized file naming for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },

  // Development server settings
  server: {
    port: 3000,
    open: true
  }
});