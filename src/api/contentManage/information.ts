import request from '@/utils/request'
import {
  UrlString,
  ListResponse,
  CommonResponse,
  ListResponseNoResults,
} from '@/typings/api'
import { ReleaseOrCancel, LogList } from '@/typings/contentManage/information'
import {
  InformationQuery,
  InformationList,
} from '@/typings/contentManage/information'

const url: UrlString = {
  getInformationList: '/inv-pc/information/management/list', //资讯列表
  getInforRelease: '/inv-pc/information/management/publish', // 取消或发布资讯
  getInforToolLog: '/inv-pc/information/management/publish/log', // 资讯管理  操作日志
}

// 获取资讯列表
export function getInformationList(
  params: InformationQuery
): Promise<ListResponse<InformationList>> {
  return request({
    url: url.getInformationList,
    method: 'get',
    params,
    noModel: true,
  })
}

// 资讯管理 发布or取消发布
export function getInforRelease(
  data: ReleaseOrCancel
): Promise<CommonResponse> {
  return request({
    url: url.getInforRelease,
    method: 'post',
    data,
  })
}

// 资讯管理  操作日志
export function getInforToolLog(
  id: number
): Promise<ListResponseNoResults<LogList>> {
  return request({
    url: `${url.getInforToolLog}/${id}`,
    method: 'get',
    noModel: true,
  })
}
