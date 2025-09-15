import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  stylistic: true,
  typescript: true,
  ignores: [
    'src/components/ui/*',
    'src/lib/utils.ts',
    '.github/*',
    '.vscode/*',
  ],
}).overrideRules({
  'no-console': ['warn'],
})
