import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {copy} from 'vite-plugin-copy';

export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        { src: 'src/public/**/*', dest: 'dist/assets' }
      ],
      hook: 'writeBundle'
    })
  ]
});