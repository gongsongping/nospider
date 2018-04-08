const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/nuxta/'
  }
} : {}


module.exports = {
  router: {
    base: '/nuxta/'
  },
  mode: 'spa',
  // env: {
  //   baseURL: process.env.BASE_URL || 'http://localhost:3001'
  // },
  head: {
    title: 'nuxta',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'nuxttest' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
  //  vendor: ['axios','vue-infinite-loading'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [{ src: '~/plugins/bootstrap.js', ssr: false }],
  // modules: [
  //   '~/node_modules/bootstrap-vue/nuxt',
  //   // Or if you have custom bootstrap CSS...
  //   // ['bootstrap-vue/nuxt', { css: false }],
  // ],
}
