module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        '@react-native-community',
        'plugin:react/recommended',
        'airbnb',
        'prettier',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['import', 'react', '@typescript-eslint', 'prettier'],
    rules: {
        'react/jsx-filename-extension': 0,
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'global-require': 0,
        '@typescript-eslint/no-var-requires': 0,
        'import/extensions': 0,
        'no-unused-vars': ['off', { vars: 'local' }],
        '@typescript-eslint/no-unused-vars': ['off', { vars: 'local' }],
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            // use <root>/tsconfig.json
            typescript: {
                alwaysTryTypes: true, // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
            },
        },
    },
};
