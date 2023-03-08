<template>
  <div class="v-container">
    <div class="searchForm">
      <el-form :model="stockData.stockForm" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label="证券代码：">
              <el-input
                v-model="stockData.stockForm.stockCode"
                placeholder="请输入证券代码"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item>
              <el-button type="primary" :icon="Search" @click="onSubmit">
                查询
              </el-button>
              <el-button :icon="Refresh" @click="onReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="tableContainer">
      <el-table
        :data="stockData.stockList"
        :v-loading="stockData.loading"
        border
        max-height="675px"
      >
        <el-table-column label="序号" width="80" :resizable="false">
          <template #default="scope">
            {{
              (pagination.currentPage - 1) * pagination.pageSize +
              scope.$index +
              1
            }}
          </template>
        </el-table-column>

        <el-table-column
          label="证券名称"
          prop="name"
          show-overflow-tooltip
          width="120"
        />
        <el-table-column
          label="证券代码"
          prop="code"
          show-overflow-tooltip
          min-width="120"
        />
        <el-table-column
          min-width="120"
          label="证券简称"
          prop="shortname"
          show-overflow-tooltip
        />
        <el-table-column
          label="证券名称（公司维护）"
          prop="stockName"
          show-overflow-tooltip
          min-width="120"
        />
        <el-table-column
          label="币种"
          prop="currency"
          show-overflow-tooltip
          min-width="120"
        />
        <el-table-column
          label="行业代码"
          prop="industryCode"
          show-overflow-tooltip
          min-width="120"
        />
        <el-table-column
          label="市场代号"
          prop="marketcode"
          show-overflow-tooltip
          min-width="120"
        />
        <el-table-column label="操作" width="80">
          <template #default="scope">
            <el-button
              link
              type="primary"
              @click="toEdit(scope.row.code, scope.row.stockName)"
            >
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pageContainer">
      <el-pagination
        :page-sizes="pagination.pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page="pagination.currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <edit
      ref="editRef"
      :code="stockCode"
      :name="stockName"
      @reload-data="getList"
    ></edit>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import { StockQuery, StockList } from '@/typings/contentManage/stock'
import { getStockList } from '@/api/contentManage/stock'
import usePagination from '@/hooks/use-pagination'
import Edit from './components/Edit.vue'

const stockData = reactive({
  loading: false,
  stockForm: {} as StockQuery,
  stockList: [] as StockList[],
})

// 查询
const onSubmit = () => {
  getList()
}

// 重置
const onReset = () => {
  stockData.stockForm = {}
  pagination.currentPage = 1
  getList()
}

// 修改
const editRef = ref()
const stockCode = ref('')
const stockName = ref('')
const toEdit = (code: string, name: string) => {
  editRef.value.dialogVisible = true
  stockCode.value = code
  stockName.value = name
}

// 获取数据
const getList = async () => {
  const parameter: StockQuery = Object.assign({}, stockData.stockForm, {
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  })

  const res = await getStockList(parameter)
  if (res.code === 200) {
    stockData.stockList = res.data.records || []
    pagination.total = res.data.total
  }
}

// 当前页码信息 TIP:存在作用域问题必须写在getList之后
const { pagination, handleSizeChange, handleCurrentChange } = usePagination(
  getList,
  { pageSize: 10 }
)

onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss"></style>
