import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import unicornPlugin from 'eslint-plugin-unicorn';
import stylisticPlugin from '@stylistic/eslint-plugin';

const defaultIgnores = [
  'dist/**',
  '**/node_modules/**',
];

export default defineConfig([
  {
    name: 'juan/ignores',
    ignores: defaultIgnores,
  },
  {
    name: 'js',
    files: ['**/*.js'],
    plugins: {
      js,
    },
    languageOptions: {
      globals: globals.browser,
    },
    extends: ['js/recommended', stylisticPlugin.configs.customize({
      indent: 2,
      semi: true,
      jsx: false,
    })],
  },
  {
    name: 'unicorn',
    files: ['**/.js'],
    extends: [unicornPlugin.configs.recommended],
  },
]);
