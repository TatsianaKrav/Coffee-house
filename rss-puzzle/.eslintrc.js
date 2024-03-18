module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: [
    'airbnb-base',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs,ts}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    'react/jsx-filename-extension': [0],
    'arrow-body-style': 0,
    'function-paren-newline': 0,
    'class-methods-use-this': 0,
    'implicit-arrow-linebreak': 0,
    'linebreak-style': 0,
    'no-param-reassign': 0,
    'no-console': 0,
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    'operator-linebreak': 0,
    'prefer-destructuring': 0,
    'no-plusplus': 0,
    'lines-between-class-members': 0,
  },
};
