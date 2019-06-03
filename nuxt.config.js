// const resolve = require('path').resolve

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '供应商系统',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'XX供应商系统' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /* 
  ** env : dev || testing || production 
  */
  env: {
    NODE_ENV: process.env.NODE_ENV
  },
  /* 
  ** other RouterRules
  */
  // router: {
  //   extendRoutes(routes){
  //     routes.push({
  //       name: 'login',
  //       path: '/login',
  //       component: resolve(__dirname,'views/login')
  //     })
  //   }
  // },
  /* 
  ** plugins
   */
  plugins: [
    {
      src: '~plugins/ElementUI',
      ssr: true
    },{
      src: '~plugins/filters',
      ssr: true
    },
    {
      src: '~plugins/Swiper',
      ssr: false
    }
  ],
  /* 
  **css 
  */
  css: [
    '~/assets/style/common.scss',
    '~/assets/style/headerBar.scss',
    '~/assets/fonts/style.css',
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
    'handsontable/dist/handsontable.full.min.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#55c1ff' },
  /*
  ** Build configuration
  */
  build: {
    /* 
    **loaders 
    */
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'img/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],
    vendor: ['axios', 'element-ui'],
    /*
    ** Run ESLint on save
    */
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
  }
}
