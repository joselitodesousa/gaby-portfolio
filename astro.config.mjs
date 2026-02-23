import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static'
});


// https://astro.build/config
export default defineConfig({
  // Astro build configuration for Vercel
  build: {
    // Output format for static site generation (default)
    format: 'directory',
  },

  // CSS and styling configuration
  vite: {
    css: {
      postcss: './postcss.config.cjs',
    },
  },

  // Site URL configuration for Vercel
  site: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000',

  // Generate the sitemap for better SEO
  integrations: [],

  // Security and performance headers
  prefetch: true,

  // Trailingslash configuration
  trailingSlash: 'ignore',

  // Your config options here.
  // https://docs.astro.build/en/reference/configuration-reference/
});
