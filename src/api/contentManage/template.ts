import request from '@/utils/request'
import {
  ListResponse,
  UrlString,
  CommonResponse,
  DetailResponse,
} from '@/typings/api'
import {
  TemplateData,
  TemplateQuery,
  TemplateAdd,
  TemplateDetail,
} from '@/typings/contentManage/template'

const url: UrlString = {
  msgTemplateList: '/content/msgTemplate/list',
  addMessageEvent: '/content/msgTemplate/addMessageEvent',
  getMsgTemplateDetail: '/content/msgTemplate/select',
}

// 获取模板数据列表
export function getMsgTemplateList(
  params: TemplateQuery
): Promise<ListResponse<TemplateData>> {
  return request({
    url: url.msgTemplateList,
    method: 'get',
    params,
  })
}

// 新增事件模板
export function addMessageEvent(data: TemplateAdd): Promise<CommonResponse> {
  return request({
    url: url.addMessageEvent,
    method: 'post',
    data,
  })
}

//获取模板详情
export function getMsgTemplateDetail(
  eventCode: string
): Promise<DetailResponse<TemplateDetail>> {
  return request({
    url: url.getMsgTemplateDetail,
    method: 'get',
    params: {
      eventCode,
    },
  })
}
