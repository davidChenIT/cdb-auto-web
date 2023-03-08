<template>
  <div class="v-container">
    <div class="searchForm">
      <el-form :model="historyData.historyForm" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label="接收人：">
              <el-input
                v-model="historyData.historyForm.username"
                placeholder="请输入接收人名称/账号"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="消息内容：">
              <el-input v-model="historyData.historyForm.message" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="创建时间：">
              <el-date-picker
                v-model="historyData.historyForm.createTime"
                type="daterange"
                range-separator="⇀"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
                style="width: 100%"
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
        v-loading="historyData.loading"
        :data="historyData.historyList"
        border
        max-height="680px"
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
        <el-table-column label="消息类型" min-width="100">
          <template #default="scope">
            <span>{{ dataFormat(scope.row.type, TypeEnum.First_Level) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="接收人"
          min-width="150px"
          :resizable="false"
          show-overflow-tooltip
        >
          <template #default="scope">
            <span>
              {{ receiverFormat(scope.row.nickname, scope.row.username) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="消息内容"
          min-width="400"
          show-overflow-tooltip
          :resizable="false"
        >
          <template #default="scope">
            <span v-html="scope.row.message"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间 "
          prop="createTime"
          min-width="160"
          :resizable="false"
        >
          <template #default="scope">
            <span>{{ scope.row.createTime || '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="查阅时间"
          prop="readTime"
          min-width="160"
          :resizable="false"
        >
          <template #default="scope">
            <span>{{ scope.row.readTime || '--' }}</span>
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
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import {
  HistoryForm,
  HistoryList,
  HistoryQuery,
} from '@/typings/contentManage/history'
import { Search, Refresh } from '@element-plus/icons-vue'
import { dataFormat } from '../template/transform'
import { TypeEnum } from '../template/const'
import { getHistoryList } from '@/api/contentManage/history'
import usePagination from '@/hooks/use-pagination'

const historyData = reactive({
  loading: false,
  historyForm: {} as HistoryForm,
  historyList: [] as HistoryList[],
})

// 查询
const onSubmit = () => {
  getList()
}

// 重置
const onReset = () => {
  historyData.historyList = []
  historyData.historyForm = {} as HistoryForm
  getList()
}

// 处理接收人
const receiverFormat = (nickname: string, username: string) => {
  if (nickname && username) {
    return `${nickname}（${username}）`
  }
  if (nickname) {
    return nickname
  }
  if (username) {
    return username
  }
  return '--'
}

// 获取数据
const getList = async () => {
  const startTime = historyData.historyForm.createTime
    ? historyData.historyForm.createTime[0]
    : ''
  const endTime = historyData.historyForm.createTime
    ? historyData.historyForm.createTime[1]
    : ''
  const parameter: HistoryQuery = {
    username: historyData.historyForm.username,
    message: historyData.historyForm.message,
    createStartTime: startTime,
    createEndTime: endTime,
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
  }
  historyData.loading = true
  const res = await getHistoryList(parameter)
  historyData.loading = false
  if (res.code === 200) {
    historyData.historyList = res.data.records || []
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
