import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';
import stringPlugin from "vite-plugin-string";


const isDev = process.env.NODE_ENV === 'development';

export default defineConfig(async () => {
  const devPlugins = isDev
    ? [(await import('solid-devtools/vite')).default()]
    : [];

  return {
    plugins: [...devPlugins, solidPlugin(),stringPlugin()],
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      target: 'esnext',
      lib: {
        entry: path.resolve(__dirname, 'src/components/ui/button.tsx'),
        name: 'cn-button',
        fileName: (format: any) => `cn-button.${format}.js`,
      },
    },
  };
});