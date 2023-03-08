import { Pagination } from '@/typings/global'
import { reactive, ref } from 'vue'

/**
 * 分页切换共用方法
 * @param getList 需要更新的列表函数
 * @returns
 */
export default function (
  getList: () => void,
  options: Partial<Pagination> = {}
) {
  const { currentPage, total, pageSize, pageSizes } = options
  const pagination = reactive<Pagination>({
    /** 当前页码  */
    currentPage: currentPage ?? 1,
    /** 列表总数  */
    total: total ?? 0,
    /** 每页数量 */
    pageSize: pageSize ?? 10,
    /** 每页配置  */
    pageSizes: pageSizes ?? [10, 20, 30, 40, 50],
  })

  const noModel = ref(false) // 不显示全局模态loading 有条件查询时列表首次加载需要全局loading

  /** pageSize 改变时触发	新每页条数 */
  const handleSizeChange = (size: number) => {
    pagination.currentPage = 1
    pagination.pageSize = size
    getList()
  }

  /** current-change 改变时触发	新当前页 */
  const handleCurrentChange = (cur = 1) => {
    pagination.currentPage = cur
    getList()
  }

  return {
    pagination,
    handleSizeChange,
    handleCurrentChange,
    noModel,
  }
}
