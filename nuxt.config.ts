import { Configuration } from '@nuxt/types';

const nuxtConfig: Configuration = {
  mode: 'universal',
  telemetry: true,
  privateRuntimeConfig: {},
  head: {
    title: process.env.npm_package_name || '',
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/style-resources',
    '@nuxtjs/eslint-module',
    [
      '@nuxt/typescript-build',
      {
        typeCheck: {
          typescript: {
            enabled: true,
            configFile: 'server.tsconfig.json',
            memoryLimit: parseInt(process.env.BUILD_WORKERS_MEMORY || '2048'),
            extensions: {
              vue: true,
            },
          },
        },
      },
    ],
    '@nuxtjs/dotenv',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'cookie-universal-nuxt',
    'nuxt-basic-auth-module',
    'bootstrap-vue/nuxt',
    'nuxt-clipboard2',
  ],

  /*
   ** Bootstrap configuration
   */
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
  },
  /*
   ** Middlewares
   */
  router: {
    middleware: [],
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vee-validate/dist/rules', 'pubnub-vue'],
  },
};

export default nuxtConfig;
