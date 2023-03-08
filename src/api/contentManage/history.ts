import request from '@/utils/request'
import { UrlString, ListResponse } from '@/typings/api'
import { HistoryQuery, HistoryList } from '@/typings/contentManage/history'

const url: UrlString = {
  getHistoryList: '/content/msg/manual/messageHistoryMessages',
}

//获取历史消息
export function getHistoryList(
  query: HistoryQuery
): Promise<ListResponse<HistoryList>> {
  return request({
    url: url.getHistoryList,
    method: 'get',
    params: query,
    noModel: true,
  })
}
