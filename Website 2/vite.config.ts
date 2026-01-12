import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages-friendly config:
// - `base: './'` makes asset paths relative so the site works when hosted under
//   https://<user>.github.io/<repo>/ without needing to know the repo name.
// - No build-time API keys are injected (keys should NEVER be shipped in a public static site).
export default defineConfig(() => ({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
}));
