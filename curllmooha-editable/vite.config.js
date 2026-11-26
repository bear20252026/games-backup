import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

// 多页构建：草甸首页 + /hire/ + 6 个 /work/ 作品页
const pages = {
  home: 'index.html',
  hire: 'hire/index.html',
  'work/polify': 'work/polify/index.html',
  'work/aera': 'work/aera/index.html',
  'work/brickblaster': 'work/brickblaster/index.html',
  'work/hologram': 'work/hologram/index.html',
  'work/paper-boat': 'work/paper-boat/index.html',
  'work/golden-hour': 'work/golden-hour/index.html',
  'work/cosmic-bloom': 'work/cosmic-bloom/index.html',
};

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 8899,
    open: false,
    fs: { strict: false },
  },
  preview: {
    port: 8899,
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map(([name, file]) => [name, `${rootDir}${file}`]),
      ),
      output: {
        // 按原站的分包方式拆三方库，避免首屏把所有依赖塞进一个 2MB 的 main
        manualChunks(id) {
          if (id.includes('src/vendor/react-runtime')) return 'react';
          if (id.includes('src/vendor/three-runtime')) return 'three';
          if (id.includes('src/vendor/rapier-runtime')) return 'rapier';
          if (id.includes('src/vendor/gsap-runtime')) return 'gsap';
          if (id.includes('src/vendor/postfx-runtime')) return 'postfx';
          return undefined;
        },
      },
    },
  },
  esbuild: {
    legalComments: 'inline',
  },
});
