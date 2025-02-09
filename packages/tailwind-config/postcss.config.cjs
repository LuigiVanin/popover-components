// eslint-disable-next-line @typescript-eslint/no-require-imports
const config = require("./tailwind.config.cjs");

module.exports = {
  plugins: {
    // Specifying the config is not necessary in most cases, but it is included
    // here to share the same config across the entire monorepo
    tailwindcss: { config },
    autoprefixer: {},
  },
};
