import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import {resolve as re} from "path";
import alias from "@rollup/plugin-alias";
import resolve from "rollup-plugin-node-resolve";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [alias(),react()],
  resolve: {
    alias: {
      '@': re(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"]
    },
    rollupOptions: {
      plugins:[resolve()],
      external: ["react", "react-dom","@ungap"]
    }
  }
})
