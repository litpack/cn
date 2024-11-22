/// <reference types="vitest" />
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";
import stringPlugin from "vite-plugin-string";
import solidDevtools from "solid-devtools/vite";
import ViteDts from "vite-plugin-dts";

const isDev = process.env.NODE_ENV === "development";

const devPlugins = isDev ? [solidDevtools()] : [];

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setup-test.ts",
  }, 
  plugins: [
    isDev ? [] : ViteDts(),
    ...devPlugins,
    solidPlugin(),
    stringPlugin(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    target: "esnext",
    lib: {
      entry: path.resolve(__dirname, "src/components/button/button.tsx"),
      name: "cn-button",
      fileName: (format) => `button/cn-button.${format}.js`,
      formats: ["es", "umd", "cjs"],
    },
    rollupOptions: {
      output: {
        globals: {
          "solid-js": "Solid",
          "solid-js/web": "SolidWeb",
          "class-variance-authority": "CVA",
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"],
      },
      mangle: {
        properties: {
          regex: /^_/
        },
      },
      output: {
        comments: false,
      },
    },
    sourcemap: false,
    outDir: "dist",
    copyPublicDir: false,
  },
});
