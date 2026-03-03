import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "dist/",
      "node_modules/",
      ".wrangler/",
      "drizzle/",
      "components/ui/", // shadcn/ui auto-generated
      "test-*.js",      // ad-hoc test scripts
      "scripts/",       // one-off Node.js scripts
    ],
  },

  // Base recommended rules
  js.configs.recommended,

  // TypeScript recommended (type-aware rules disabled for speed)
  ...tseslint.configs.recommended,

  // Global settings for all source files
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    rules: {
      // React hooks
      ...reactHooks.configs.recommended.rules,

      // React Refresh (Vite HMR)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Relax rules for existing codebase
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-empty": ["warn", { allowEmptyCatch: true }],
    },
  },

  // Node/Cloudflare backend files
  {
    files: ["api/**/*.ts", "server/**/*.ts", "functions/**/*.ts", "db/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Config files (CJS)
  {
    files: ["*.config.{js,ts}", "drizzle.*.ts", "postcss.config.js", "tailwind.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  }
);
