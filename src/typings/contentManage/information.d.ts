import { ListQuery } from '@/typings/api'

// 查询参数
export interface InformationQuery extends ListQuery {
  topCategory?: string //一级分类
  secondCategory?: string //二级分类
  publishStatus?: string //发布状态
  keyword?: string //关键词
  relationStock?: string //关联股票代码
  date?: string //资讯日期
}

// 资讯管理列表数据结构
export interface InformationList {
  // 来源
  source: string
  // 一级分类
  topCategory: string
  topCategoryName: string
  // 二级分类
  secondCategory: string
  // 关键词
  keyword: string
  // 标题
  newsTitle: string
  // 管理股票代码
  relationStock: string
  // 发布状态
  publishStatus: number
  // 发布终端
  publishTerminal: number
  // 资讯日期
  date: string
  // 阅读量
  readingVolume: number

  author: string
  chg?: null
  chgPct?: null
  content: string
  dateTime: string
  id: number
  imageUrl: string

  market: string
  newsId: number

  remark?: null

  tertiaryCategory: string
  time: string

  xdbmask: number
}

// 发布or取消发布
export interface ReleaseOrCancel {
  id: number
  publishStatus: number
  publishTerminal: number
  remarks: string
}

// 操作日志列表
export interface LogList {
  dateTime: string
  optUserId: number
  optUserName: string
  publishStatus: number
  publishTerminal: number
  remark: string
}
