import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',

  modules: ['@wxt-dev/module-react'],

  manifest: {
    default_locale: 'zh_TW',
    description: '__MSG_extDescription__',
    host_permissions: [
      '*://*.github.com/*',
    ],
    name: '__MSG_extName__',
    permissions: [],
    action: {},
  },
  vite: () => ({
    plugins: [
      tailwindcss(),
    ],
  }),
})
