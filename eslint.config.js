import globals from 'globals';
import pluginJs from '@eslint/js';


export default [
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'semi': [1, 'always'],
      'quotes': [2, 'single'],
      'no-unused-vars': 'off',
    }
  }
];