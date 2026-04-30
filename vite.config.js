import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'import.meta.env.VITE_API_BASE_1': JSON.stringify(
        env.VITE_API_BASE_1 || 'http://175.11.0.122:5000'
      ),
      'import.meta.env.VITE_API_BASE_2': JSON.stringify(
        env.VITE_API_BASE_2 || 'http://175.11.0.122:3001'
      ),
      'import.meta.env.VITE_API_URL': JSON.stringify(
        env.VITE_API_URL || env.VITE_API_BASE_2 || 'http://175.11.0.122:3001'
      ),
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});
