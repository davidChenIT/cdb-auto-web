/// <reference types="vite/client" />

declare module '*.vue' {
  import type { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_HOST: string // 开发环境跨域主域名
  readonly VITE_NODE_ENV: 'dev' | 'test' | 'prod' // 当前环境
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
