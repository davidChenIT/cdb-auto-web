<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      custom-class="info-toolLog"
      width="800px"
      title="操作日志"
      @close="close"
      @open="open"
    >
      <el-table v-loading="loading" :data="pageData.logList" border>
        <el-table-column label="操作人" min-width="120" align="left">
          <template #default="scope">
            {{ scope.row.optUserName || '--' }}
          </template>
        </el-table-column>

        <el-table-column label="操作时间" min-width="150" align="left">
          <template #default="scope">
            {{ scope.row.dateTime || '--' }}
          </template>
        </el-table-column>

        <el-table-column label="发布终端" min-width="130" align="left">
          <template #default="scope">
            {{ dictFun(termOption, scope.row.publishTerminal || 0) || '--' }}
          </template>
        </el-table-column>

        <el-table-column label="发布操作" min-width="90" align="left">
          <template #default="scope">
            {{ scope.row.publishStatus == 0 ? '发布' : '取消发布' || '--' }}
          </template>
        </el-table-column>

        <el-table-column
          label="备注"
          min-width="200"
          align="left"
          show-overflow-tooltip
        >
          <template #default="scope">
            {{ scope.row.remark || '--' }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { LogList } from '@/typings/contentManage/information'
import { dictFun } from '@/utils/public'
import { termOption } from '../const'
import { getInforToolLog } from '@/api/contentManage/information'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})
const { id } = toRefs(props)

const dialogVisible = ref(false)
const loading = ref(false)

const pageData = reactive({
  logList: [] as LogList[],
})

// 关闭
const close = () => {
  pageData.logList = []
}

// 获取数据
const open = async () => {
  loading.value = true
  const res = await getInforToolLog(id.value)
  loading.value = false
  if (res.code === 200) {
    pageData.logList = res.data
  }
}

defineExpose({ dialogVisible })
</script>

<style scoped lang="scss"></style>
