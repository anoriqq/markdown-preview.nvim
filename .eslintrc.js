module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
  },
  settings: {
    react: {
      version: 'detect'
    },
  },
  ignorePatterns: [
    'app/bin/*',
    'app/lib/*',
    'app/out/*',
    'app/_static/*'
  ]
}
