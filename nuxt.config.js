const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/nuxta/'
  }
} : {}


module.exports = {
  css: [
    // 项目中的 CSS 文件
    // 'bootstrap/dist/css/bootstrap.css',
    // 'bootstrap-vue/dist/bootstrap-vue.css',
    // 项目中的 Sass 文件 @/assets ~/assets all is ok
    { src: '~assets/css/main.scss', lang: 'scss' } // 指定 scss 而非 sass
  ],
  router: {
    // linkActiveClass: 'link-active',
    linkExactActiveClass:'link-exact-active',
    base: '/nuxta/',
  },
  // mode: 'spa',
  head: {
    title: 'nuxta',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'nuxttest' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: 'tomato' },
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
  plugins: [
    { src: '~/plugins/bootstrap.js', ssr: true },
    // { src: '~/plugins/axios.js', ssr: true }, //当没有用到Vue.use(..)的时候,不用在这里引入
  ],
  // modules: [
  //   '~/node_modules/bootstrap-vue/nuxt',
  //   // Or if you have custom bootstrap CSS...
  //   // ['bootstrap-vue/nuxt', { css: false }],
  // ],
}
