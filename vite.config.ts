import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: false,
      resolvers: [VantResolver({ importStyle: false })]
    }),
    createSvgIconsPlugin({
      // 指定图标⽂件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/dev-api': {
        target: 'https://consult-api.itheima.net',
        changeOrigin: true, //允许跨域 可以代理反向的地址
        rewrite: (path) => path.replace(/^\/dev-api/, '') // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`
        //（注意: path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；
        //选项的 key 也是斜杠（/）开头的）
      }
    }
  }
})
