<template>
  <!-- 资讯管理 -->
  <div class="v-container">
    <div class="searchForm">
      <el-form ref="inforFormRef" :model="options.inforForm">
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label="一级分类:">
              <el-select
                v-model="options.inforForm.topCategory"
                placeholder="请选择"
                clearable
                @change="changeDict"
              >
                <el-option
                  v-for="item in options.topCategoryOption"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="options.inforForm.topCategory" :span="5">
            <el-form-item label="二级分类:">
              <el-select
                v-model="options.inforForm.secondCategory"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options.secondCategoryOption"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="发布状态:">
              <el-select
                v-model="options.inforForm.publishStatus"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="关键词:">
              <el-input
                v-model="options.inforForm.keyword"
                placeholder="请输入关键词"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="关联股票:">
              <el-input
                v-model="options.inforForm.relationStock"
                placeholder="请输入关联股票"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label="资讯日期:">
              <el-date-picker
                v-model="options.inforForm.date"
                placeholder="请选择"
                type="date"
                value-format="x"
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
        v-loading="loading"
        :data="options.informationList"
        element-loading-text="正在加载..."
        max-height="675"
        border
      >
        <el-table-column
          label="序号"
          width="80"
          align="center"
          :resizable="false"
        >
          <template #default="scope">
            {{
              (pagination.currentPage - 1) * pagination.pageSize +
              scope.$index +
              1
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="资讯来源"
          prop="source"
          min-width="100"
          :resizable="false"
        >
          <template #default="scope">
            {{ scope.row.source || '--' }}
          </template>
        </el-table-column>
        <el-table-column
          label="一级分类"
          prop="topCategoryName"
          min-width="90"
          :resizable="false"
        >
          <template #default="scope">
            {{ scope.row.topCategoryName || '--' }}
          </template>
        </el-table-column>
        <el-table-column
          label="二级分类"
          prop="secondCategory"
          min-width="90"
          :resizable="false"
          show-overflow-tooltip
        >
          <template #default="scope">
            {{ scope.row.secondCategory || '--' }}
          </template>
        </el-table-column>
        <el-table-column
          label="关键词"
          prop="keyword"
          min-width="170"
          :resizable="false"
          show-overflow-tooltip
        >
          <template #default="scope">
            {{ scope.row.keyword || '--' }}
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
          prop="newsTitle"
          min-width="380"
          :resizable="false"
          show-overflow-tooltip
        >
          <template #default="scope">
            {{ scope.row.newsTitle || '--' }}
          </template>
        </el-table-column>
        <el-table-column
          label="关联股票代码"
          prop="relationStock"
          min-width="150"
          :resizable="false"
          show-overflow-tooltip
        >
          <template #default="scope">
            {{ scope.row.relationStock || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="发布状态" min-width="85 " align="center">
          <template #default="scope">
            {{ scope.row.publishStatus == 0 ? '已发布' : '未发布' }}
          </template>
        </el-table-column>
        <el-table-column
          label="发布终端"
          min-width="120"
          align="left"
          show-overflow-tooltip
        >
          <template #default="scope">
            {{ dictFun(termOption, scope.row.publishTerminal) }}
          </template>
        </el-table-column>
        <el-table-column label="资讯日期" min-width="120" align="left">
          <template #default="scope">
            {{ scope.row.date || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="阅读量" min-width="80" align="left">
          <template #default="scope">
            {{ scope.row.readingVolume || '0' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210" fixed="right" align="left">
          <template #default="scope">
            <el-button link type="primary" @click="toDetail(scope.row)">
              查看
            </el-button>
            <el-button
              v-show="scope.row.publishStatus == '0'"
              v-if="!scope.row.publishStatus"
              link
              type="primary"
              @click="toRelease(ReleaseType.Cancel, scope.row)"
            >
              取消发布
            </el-button>
            <el-button
              v-show="scope.row.publishStatus == '1'"
              link
              type="primary"
              @click="toRelease(ReleaseType.Release, scope.row)"
            >
              发布
            </el-button>
            <el-button link type="primary" @click="toLog(scope.row.id)">
              操作日志
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
    <detail ref="detailRef" :news-title="newsTitle" :content="content"></detail>
    <release-or-cancel
      :id="id"
      ref="releaseRef"
      :publish-status="publishStatus"
      :publish-terminal="publishTerminal"
      @reload-data="getList"
    ></release-or-cancel>
    <log :id="infoId" ref="logRef"></log>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import { statusOptions, termOption, ReleaseType } from './const'
import { getDictsData } from '@/api/public'
import { DictListData } from '@/typings/public'
import {
  InformationQuery,
  InformationList,
} from '@/typings/contentManage/information'
import { getInformationList } from '@/api/contentManage/information'
import { dictFun } from '@/utils/public'
import usePagination from '@/hooks/use-pagination'
import Detail from './components/Detail.vue'
import ReleaseOrCancel from './components/ReleaseOrCancel.vue'
import Log from './components/Log.vue'

const options = reactive({
  // 一级分类
  topCategoryOption: [] as DictListData[],
  // 二级分类
  secondCategoryOption: [] as DictListData[],
  // 查询条件
  inforForm: {} as InformationQuery,
  // 列表数据
  informationList: [] as InformationList[],
})

const loading = ref(false)

// 查询
const onSubmit = () => {
  getList()
}
// 重置
const onReset = () => {
  options.inforForm = {}
  getList()
}

// 获取二级分类
const changeDict = async (value: string) => {
  if (value) {
    options.secondCategoryOption = []
    const res = await getDictsData(value)
    if (res.code === 200) {
      options.secondCategoryOption = res.data
    }
  }
}

// 获取列表
const getList = async () => {
  const query = Object.assign({}, options.inforForm, {
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
  })
  loading.value = true
  const res = await getInformationList(query)
  loading.value = false
  if (res.code === 200) {
    options.informationList = res.data.record || []
    pagination.total = res.data.total
  }
}

// 当前页码信息 TIP:存在作用域问题必须写在getList之后
const { pagination, handleSizeChange, handleCurrentChange } = usePagination(
  getList,
  { pageSize: 10 }
)

// 查看
const detailRef = ref()
const newsTitle = ref('')
const content = ref('')
const toDetail = (row: InformationList) => {
  detailRef.value.dialogVisible = true
  newsTitle.value = row.newsTitle
  content.value = row.content
}

// 发布or取消发布
const releaseRef = ref()
const id = ref(0)
const publishStatus = ref(1)
const publishTerminal = ref(2)
const toRelease = (type: ReleaseType, row: InformationList) => {
  releaseRef.value.dialogVisible = true
  id.value = row.id
  publishStatus.value = type
  publishTerminal.value = row.publishTerminal
}

// 操作日志
const logRef = ref()
const infoId = ref()
const toLog = (id: number) => {
  logRef.value.dialogVisible = true
  infoId.value = id
}

onMounted(async () => {
  // 获取一级分类
  const res = await getDictsData('top_category')
  if (res.code === 200) {
    options.topCategoryOption = res.data
    // console.log('res.data', res.data)
  }

  // 默认数据
  await getList()
})
</script>

<style scoped lang="scss"></style>
