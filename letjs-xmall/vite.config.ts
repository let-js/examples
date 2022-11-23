import { ConfigEnv, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const { VITE_PORT } = env
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    plugins: [
      // Vue3单文件组件支持
      vue(),
      // mock配置
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve', // 也可以通过env来设置相应的变量
        supportTs: true,
        watchFiles: true,
      }),
      // 组件按需自动导入
      Components({
        dts: true, // 自动生成ts声明文件
        resolvers: [NaiveUiResolver()],
      }),
      // API自动导入
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],

        imports: [
          // presets
          'vue',
          'vue-router',
          'pinia',
          {
            '@vueuse/core': [],
            lodash: ['_'],
            axios: [['default', 'axios']],
            dayjs: [['default', 'dayjs']],
          },
        ],

        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
    ],
  }
}
