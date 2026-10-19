import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const API_PORT = process.env.API_PORT || 3001;

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // The browser only ever talks to /api on this same origin.
    // Vite forwards those requests to the Express server.
    proxy: {
      '/api': `http://localhost:${API_PORT}`,
    },
  },
});
