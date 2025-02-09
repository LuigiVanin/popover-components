// File for workflow linting

// eslint-disable-next-line
import tseslint from "@typescript-eslint/eslint-plugin";
// eslint-disable-next-line
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  prettier,
  {
    ignores: ["dist/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsparser,
      globals: {
        window: "readonly",
        document: "readonly",
        module: "readonly",
        require: "readonly",
        HTMLElement: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      vue: vue,
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/named": "off",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["default"],
        },
      ],
    },
  },
  {
    files: ["**/*.vue"],
    ignores: ["dist/**"],

    languageOptions: {
      parser: vueParser, // ✅ Use vue-eslint-parser here
      parserOptions: {
        parser: tsparser, // ✅ TypeScript parser for <script> inside Vue
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        window: "readonly",
        document: "readonly",
        module: "readonly",
        HTMLElement: "readonly",
      },
    },
    plugins: {
      vue: vue,
      "@typescript-eslint": tseslint,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "import/named": "off",
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^(_|event|e)",
          varsIgnorePattern: "^(_|event|e)",
        },
      ],
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^(_|event|e)",
          varsIgnorePattern: "^(_|event|e)",
        },
      ],
    },
  },
];
