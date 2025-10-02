import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 引入 svg 插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import path from 'path'

const host = process.env.TAURI_DEV_HOST;

function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    // 配置 svg 插件
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
      // inject: 'body-last', // 插入位置
      svgoOptions: true // 开启svgo压缩
    })
  ],
  resolve: {
    alias: {
      '@': resolve('src'), // 配置 @ 指向 src
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/index.scss";` // 全局引入变量文件
      }
    }
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
        protocol: "ws",
        host,
        port: 1421,
      }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },

}));
