import { _RouteRecordBase } from 'vue-router'

/** 路由只有一个children时的类型 */
export interface OnlyOneChildRouter extends _RouteRecordBase {
  /** 不显示子路由 */
  noShowingChildren?: boolean
}

export interface closeTagType {
  fullPath: string
  name?: string
  path?: string
  title: string
  time?: number
  closeFlag?: boolean
}
