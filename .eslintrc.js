module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/'],
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-no-useless-fragment': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-tag-spacing': 'off',
    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.js'] }],
    'react/button-has-type': 'off',
    'default-param-last': 'off',
    'object-curly-spacing': 'off',
    'no-underscore-dangle': 'off',
    'no-case-declarations': 'off',
    'no-unused-expressions': 'off',
    'eslint-disable-next-line': 'off',
    'no-restricted-globals ': 'off',
    'no-confusing-arrow': 'off',
    'no-use-before-define': 'off',
    'no-return-await': 'off',
    'no-shadow': 'off',
    'no-static-element-interactions': 'off',
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'arrow-parens': 'off',
    'max-len': 'off',
    'quote-props': 'off',
    'eslint quote-props': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
