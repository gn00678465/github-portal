import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',

  modules: ['@wxt-dev/module-react'],

  manifest: {
    default_locale: 'en',
    description: '__MSG_extDescription__',
    host_permissions: [],
    name: '__MSG_extName__',
    permissions: [],
  },
  vite: () => ({
    plugins: [
      tailwindcss(),
    ],
  }),
})
