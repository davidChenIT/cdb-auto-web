import { ListQuery } from '@/typings/api'

// 查询
export interface StockQuery extends ListQuery {
  stockCode?: string
}

// 股票列表
export interface StockList {
  //证券名称
  name?: string
  //证券代码
  code?: string
  //证券简称
  shortname?: string
  //证券名称（公司维护）
  stockName?: string
  //币种
  currency?: string
  //市场代号
  marketcode?: string
  //行业代码
  industryCode?: string
}

// 修改股票名称
export interface StockItem {
  code: string
  name: string
}
