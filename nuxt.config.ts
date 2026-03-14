// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel',
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      'Cormorant Garamond': [300, 400, 500, 600, 700],
      Inter: [300, 400, 500, 600],
    },
    display: 'swap',
    preload: true,
  },

  app: {
    head: {
      title: 'Isang Kusina 2026 | Follow the X | Istorya',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'A collaborative dinner celebrating Filipino-American cuisine across U.S. generations and geographies. May 22, 2026 · Keep Memory Alive Event Center · Las Vegas, Nevada.',
        },
        { property: 'og:title', content: 'Isang Kusina 2026 | Follow the X | Istorya' },
        {
          property: 'og:description',
          content:
            'A collaborative dinner celebrating Filipino-American cuisine across U.S. generations and geographies. May 22, 2026 · Las Vegas.',
        },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  typescript: {
    strict: true,
  },

  devtools: { enabled: false },
})
