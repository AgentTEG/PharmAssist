import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevtools from 'vite-plugin-vue-devtools'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: isProduction ? '/PharmAssist/' : '/', // this tells Vite where your app is hosted
  plugins: [vue(), vueDevtools()],
})
