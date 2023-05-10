module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
      'react',
      'react-hooks',
      'import',
    ],
    extends: [
      'airbnb-typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    rules: {
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off',
      'react/prop-types': 'off',
      'react/jsx-fragments': ['error', 'syntax'],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  };