module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'no-restricted-exports': 0,
    'react/prop-types': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'default-param-last': 0,
    'no-unused-vars': 0,
    'no-shadow': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'no-restricted-syntax': 0,
    'guard-for-in': 0,
    'no-loop-func': 0,
    'react/react-in-jsx-scope': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
  },
};
