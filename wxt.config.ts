import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'wxt'
import packageInfo from './package.json'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',

  modules: ['@wxt-dev/module-react'],

  manifest: () => ({
    version: packageInfo.version,
    default_locale: 'zh_TW',
    description: '__MSG_extDescription__',
    host_permissions: [
      '*://*.github.com/*',
    ],
    name: '__MSG_extName__',
    permissions: [],
    action: {},
    browser_specific_settings: {
      gecko: import.meta.env.WXT_EXTENSION_ID
        ? {
            id: import.meta.env.WXT_EXTENSION_ID,
            strict_min_version: '109.0',
          }
        : {
            strict_min_version: '109.0',
          },
    },
  }),
  vite: () => ({
    plugins: [
      tailwindcss(),
    ],
  }),
})
