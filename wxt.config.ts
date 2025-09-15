import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',

  modules: ['@wxt-dev/module-react'],

  manifest: {
    default_locale: 'zh-TW',
    description: '__MSG_extDescription__',
    host_permissions: [
      '*://*.github.com/*',
    ],
    name: '__MSG_extName__',
    permissions: [],
    icons: {
      16: 'icons/16.png',
      32: 'icons/32.png',
      48: 'icons/48.png',
      96: 'icons/96.png',
      128: 'icons/128.png',
    },
    action: {},
  },
  vite: () => ({
    plugins: [
      tailwindcss(),
    ],
  }),
})
