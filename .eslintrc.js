module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['naming-regex.js', '.eslintrc.js'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['tsconfig.json'],
      },
    },
    'jsx-a11y': {
      // Enable custom components to be checked as DOM elements
      // Syntax: `"CustomComponentName": "DOM element type"`
      components: {
        Input: 'input',
      },
    },
    tailwindcss: {
      callees: ['twMerge', 'clsx', 'cn'],
    },
  },
  rules: {
    // eslint-plugin-react
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
  },
};
