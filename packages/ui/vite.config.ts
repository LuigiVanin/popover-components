import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,

    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      formats: ["es"],
      name: "ui",
    },
    rollupOptions: {
      // Set Vue as an external dependency, so its not bundled into the library
      external: ["vue", "@popover/tw-utils", "@vueuse/core"],
      output: {
        globals: {
          Vue: "vue",
        },
      },
    },
  },
  plugins: [vue(), dts()],
});
