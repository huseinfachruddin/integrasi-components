import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ⬅️ di sini kita mapping @ -> folder src
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "IntegrasiComponents",
      fileName: (format) => `integrasi-components.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
