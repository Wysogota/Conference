module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
  ],
  rules: {
    quotes: [1, 'single'],
    semi: [1, 'always'],
    'comma-dangle': [1, {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'always-multiline',
      imports: 'always-multiline',
    }],
    'react/react-in-jsx-scope': 'off',
    'no-trailing-spaces': [1, { skipBlankLines: true }],
    'no-unused-vars': 1,
    camelcase: 0,
    'react/jsx-indent': [1, 2],
  },
};
