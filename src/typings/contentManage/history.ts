import { ListQuery } from '@/typings/api'

// 历史消息查询参数
export interface HistoryQuery extends ListQuery {
  username?: string
  message?: string
  createStartTime?: string
  createEndTime?: string
}

// 历史消息查询表单
export interface HistoryForm {
  username: string
  message: string
  createTime: string[]
}

// 历史消息列表
export interface HistoryList {
  createTime: string
  message: string
  nickname: string
  readTime?: string
  sendTime?: string
  type: number
  userId: number
  username: string
}
