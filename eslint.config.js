import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'test-results/**']
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['tests/**', '**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.vitest
      }
    }
  }
];
