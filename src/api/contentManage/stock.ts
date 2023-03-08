import request from '@/utils/request'
import { UrlString, ListResponse, CommonResponse } from '@/typings/api'
import { StockQuery, StockList, StockItem } from '@/typings/contentManage/stock'

const url: UrlString = {
  getStockList: `/inv-pc/market/stock/list/define`,
  modifyStockItem: `/inv-pc/market/stock/update/name`,
}

// 股票管理 查询
export function getStockList(
  params: StockQuery
): Promise<ListResponse<StockList>> {
  return request({
    url: url.getStockList,
    method: 'get',
    params,
  })
}

// 修改股票名称
export function modifyStockItem(data: StockItem): Promise<CommonResponse> {
  return request({
    url: url.modifyStockItem,
    method: 'post',
    data,
  })
}
