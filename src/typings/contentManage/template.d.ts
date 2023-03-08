import { ListQuery } from '@/typings/api'

// 消息类型
export interface MessageType {
  name: string
  value: string
}

// 模板管理模板列表数据结构
export interface TemplateData {
  createBy: string
  createTime: number
  enable: boolean
  eventCode: string
  eventName: string
  eventType: number
  firstLevelType: number
  id: number
  landingPage: string
  receiverType: number
  secondLevelType: number
  updateBy: string
  updateTime: number
}

// 查询
export interface TemplateQuery extends ListQuery {
  firstLevelType?: string
  secondLevelType?: string
}

// 新增模板
export interface TemplateAdd {
  firstLevelType: string
  secondLevelType?: string
  eventCode: string
  eventName: string
  receiverType: string
  eventType?: number
  landingPage?: string
}

// 消息事件
export interface MessageEvent {
  createBy: string
  createTime: number
  enable: boolean
  eventCode: string
  eventName: string
  eventType: number
  firstLevelType: number
  id: number
  landingPage: string
  receiverType: number
  secondLevelType: number
  updateBy: string
  updateTime: number
}

// 模板
export interface TemplateEndPointList {
  endPoint: number
  isPopup: number
  templateContent: string
}

// 模板详情
export interface TemplateDetail {
  messageEvent: MessageEvent
  templateEndPointList: TemplateEndPointList[]
}
