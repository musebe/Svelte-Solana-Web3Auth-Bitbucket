import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/** @type {import('@sveltejs/kit').Config} */
const config = defineConfig({
  kit: {
    adapter: adapter({
      // options are optional
      // more details on options can be found in the documentation
    }),
    // Other kit options can be added here
  },
  preprocess: vitePreprocess(),
  // Vite-specific configurations go here, outside of the kit object
  vite: {
    build: {
      chunkSizeWarningLimit: 2000, // Size in KB
    },
    // You can add other Vite configurations here as needed
  },
});

export default config;
