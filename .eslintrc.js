module.exports = {
  root: true,
  extends: ["@react-native-community", "plugin:typescript-enum/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "typescript-enum", "import"],
  settings: {
    "import/internal-regex": "^@/",
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: ["*.js", "*.mjs", "*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-unused-vars": ["warn"],
        "no-shadow": "off",
        "no-undef": "off",
        "prettier/prettier": "warn",
        quotes: [2, "double", "avoid-escape"],
        "no-restricted-imports": [
          "error",
          {
            paths: [
              {
                name: "i18n-js",
                importNames: ["t"],
                message:
                  "Please use t from i18n (src/i18n/index.ts) instead, so that strict type checks work.",
              },
            ],
          },
        ],
        "import/order": [
          "error",
          {
            groups: [
              ["builtin", "external"],
              "internal",
              ["parent", "sibling", "index"],
            ],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
            "newlines-between": "always",
          },
        ],
      },
    },
  ],
};
