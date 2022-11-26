import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import path from 'path'
import viteEslint from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'
import viteImagemin from 'vite-plugin-imagemin'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/style/variable.scss'))
const isProduction = process.env.NODE_ENV === 'production'
const CDN_URL = '************'
// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? CDN_URL : '/',
  build: {
    // 8 KB
    assetsInlineLimit: 8 * 1024,
  },
  resolve: {
    alias: {
      '@assets': path.join(__dirname, './src/assets'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['.gltf'],

  plugins: [
    react(),
    viteEslint(),
    svgr(),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/icons')],
    }),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7,
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9],
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  // css
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
        }),
      ],
    },
  },
})
