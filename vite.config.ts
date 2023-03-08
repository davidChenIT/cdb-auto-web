import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const plugins = [
    vue(),
    vueJsx(),
    legacy(), // 为打包后的文件提供传统浏览器兼容性支持
    // svg
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
    PkgConfig(), // 加速启动 首次加载时依然很慢，这是正常现象，因为第一次加载vite也不知道哪些以来需要预构建
    OptimizationPersist(), // 加速启动的配置
  ]
  return {
    plugins,
    css: {
      preprocessorOptions: {
        // scss: {
        //   additionalData:
        //     '@import "./src/styles/variables.scss";@import "./src/styles/themes/mixin.scss";',
        //   // 关闭编译时 字符编码报错问题
        //   charset: false,
        // },
      },
    },
    resolve: {
      // 替换路径别名 如果是ts 还需要在tsconfig.json中配置
      alias: [
        { find: '@', replacement: '/src' },
        { find: '@business', replacement: '/src/components/business' },
      ],
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_HOST,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
