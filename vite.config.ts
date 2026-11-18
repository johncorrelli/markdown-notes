import react from '@vitejs/plugin-react';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  // Port 3000 matches the redirect URI registered for the Dropbox app.
  server: {port: 3000},
  preview: {port: 3000},
  build: {outDir: 'build'},
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
