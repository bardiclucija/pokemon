export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "@/assets/scss/global.scss"
  ],
  modules: [
    ['@nuxtjs/google-fonts', {
      families: {
        'Roboto': true,
        'Pixelify Sans': true,
        download: true,
        inject: true
      }
    },
    ],
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
})


