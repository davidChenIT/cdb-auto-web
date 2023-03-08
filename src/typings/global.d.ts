/** 分页页码结构 */
export interface Pagination {
  /** 当前页码  */
  currentPage: number
  /** 列表总数  */
  total: number
  /** 每页数量 */
  pageSizes?: number[]
  /** 每页配置  */
  pageSize: number
}
