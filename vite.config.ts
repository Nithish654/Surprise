import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // IMPORTANT: must match your repository name
  base: '/Surprise/',

  build: {
    outDir: 'dist',
  },
});
