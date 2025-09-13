import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ),
  ...compat.config({
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'padding-line-between-statements': [
        2,
        {
          blankLine: 'always',
          prev: '*',
          next: ['return', 'break'],
        },
        {
          blankLine: 'always',
          prev: ['const', 'let'],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['const', 'let'],
          next: ['const', 'let'],
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'if',
        },
        {
          blankLine: 'always',
          prev: 'if',
          next: '*',
        },
      ],
    },
  }),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.spec.{js,jsx,ts,tsx}',
      'tests/**',
    ],
  },
];

export default eslintConfig;
