<template>
  <div class="v-container">
    <div class="searchForm">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="消息类型：">
          <el-select
            v-model="formInline.firstLevelType"
            placeholder="请选择消息类型"
          >
            <el-option
              v-for="item in firstLevelList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类：">
          <el-select
            v-model="formInline.secondLevelType"
            placeholder="请选择二级分类"
          >
            <el-option
              v-for="item in secondLevelList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="onSubmit">
            查询
          </el-button>
          <el-button :icon="Refresh" @click="onReset">重置</el-button>
          <el-button type="primary" :icon="Plus" @click="onAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tableContainer">
      <el-table
        v-loading="loading"
        :data="list"
        border
        max-height="690"
        element-loading-text="正在加载..."
      >
        <el-table-column
          label="序号"
          width="80"
          align="center"
          :resizable="false"
        >
          <template #default="scope">
            {{
              pagination.pageSize * (pagination.currentPage - 1) +
              scope.$index +
              1
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="消息类型"
          prop="firstLevelType"
          min-width="158"
          :resizable="false"
        >
          <template #default="scope">
            {{ dataFormat(scope.row.firstLevelType, TypeEnum.First_Level) }}
          </template>
        </el-table-column>
        <el-table-column
          label="二级分类"
          prop="secondLevelType"
          min-width="200"
          :resizable="false"
        >
          <template #default="scope">
            {{ dataFormat(scope.row.secondLevelType, TypeEnum.Second_Level) }}
          </template>
        </el-table-column>
        <el-table-column
          label="触发规则"
          prop="eventName"
          width="605"
          :resizable="false"
        />
        <el-table-column
          label="接收人"
          prop="receiverType"
          width="315"
          :resizable="false"
        >
          <template #default="scope">
            {{ dataFormat(scope.row.receiverType, TypeEnum.Receiver_Type) }}
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          width="262"
          :resizable="false"
        >
          <template #default="scope">
            {{ GetTime(scope.row.updateTime).allDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" :resizable="false">
          <template #default="scope">
            <span class="links" @click="handleEdit(scope.row)">编辑</span>
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

    <add-dialog ref="AddDialogRef" @reload-data="getList"></add-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import {
  firstLevelList,
  secondLevelList,
  receiverList,
  TypeEnum,
} from './const'
import { TemplateData, TemplateQuery } from '@/typings/contentManage/template'
import usePagination from '@/hooks/use-pagination'
import { getMsgTemplateList } from '@/api/contentManage/template'
import { GetTime } from '@/utils/public'
import AddDialog from './components/Add.vue'
import { dataFormat } from './transform'

// 获取全局挂载
// const globalProperties =
//   getCurrentInstance()?.appContext.config.globalProperties
// 按钮权限
// const { $VeriPer } = globalProperties

const formInline = reactive({
  firstLevelType: '',
  secondLevelType: '',
})

const list = ref<TemplateData[]>([])
const loading = ref(false)

// 搜索
const onSubmit = () => {
  getList()
}

// 重置
const onReset = () => {
  formInline.firstLevelType = ''
  formInline.secondLevelType = ''
  getList()
}

// 点击新增
const AddDialogRef = ref()
const onAdd = () => {
  AddDialogRef.value.dialogVisible = true
}

// 点击编辑
const router = useRouter()
const handleEdit = (row: TemplateData) => {
  router.push({ name: 'templateEdit', query: { eventCode: row.eventCode } })
}

// 获取参数
const getQuery = (): TemplateQuery => {
  const query: TemplateQuery = {
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  }
  if (formInline.firstLevelType) {
    query.firstLevelType = formInline.firstLevelType
  }
  if (formInline.secondLevelType) {
    query.secondLevelType = formInline.secondLevelType
  }

  return query
}

// 获取列表
const getList = async () => {
  const query = getQuery()
  const res = await getMsgTemplateList(query)
  if (res.code === 200) {
    list.value = res.data.records || []
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

<style scoped lang="scss">
.template-table {
  height: 100%;
}
</style>
