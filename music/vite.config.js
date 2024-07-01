import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
        }),
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep'],
        }),
        ]
      }),
      Icons({
        autoInstall: true,
      }),
      vue()
    ],
    resolve:{
      alias:{
        '@':resolve('src')
      }
    },
    server: {
      host: '127.0.0.1',
      port: 4000,
      proxy: {
          "/api": {
              // target: "https://lianghj.top:3000/",
              target: env.VITE_API_URL,
              //target: "http://localhost:3000/",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ""),
          },
      },
    }
  }
})