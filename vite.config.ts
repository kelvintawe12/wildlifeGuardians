
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@services': resolve(__dirname, 'src/services'),
    },
  },
  plugins: [react()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'sonner'],
          utils: ['axios']
        }
      }
    }
  },
  server: {
    host: true, // Allow access from network
    port: 3000
  },
  preview: {
    host: true,
    port: 4173
  },
  // PWA optimization
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  }
})
