module.exports = {
  root: true,

  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue']
  },

  env: {
    browser: true,
    es2021: true,
    node: true
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential', // Choose your Vue configuration
    'airbnb-base',
    'plugin:prettier/recommended' // Prettier integration
  ],

  plugins: [
    '@typescript-eslint',
    'vue',
    'prettier' // Runs Prettier as an ESLint rule
  ],

  rules: {
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-void': 'off',
    'no-nested-ternary': 'off',
    'max-classes-per-file': 'off',

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'prefer-promise-reject-errors': 'off',

    'quotes': ['warn', 'single', { avoidEscape: true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'class-method': 'off',
    'class-methods-use-this': 'off',
    'no-return-await': 'off',
    'no-tabs': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'camelcase': 'off',

    // Enable Prettier-specific rules
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        endOfLine: 'auto',
        semi: false,
        tabWidth: 2,
        printWidth: 80
      }
    ]
  }
}