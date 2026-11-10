import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { allowedHosts: ['terminal.local'] },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/main-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (asset) => asset.names?.some(name => name.endsWith('.css'))
          ? 'css/style-[hash][extname]'
          : 'assets/[name]-[hash][extname]',
      },
    },
  },
});
