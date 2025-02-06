  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react-swc";

  import * as path from "path";

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react()],
    base: "./",
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: false,
      }
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    },
  });
