<template>
  <div class="info-release">
    <el-dialog
      v-model="dialogVisible"
      :title="publishStatus ? '取消发布' : '发布'"
      width="480px"
      @close="close"
    >
      <div class="content">
        <div class="label-item">
          <span class="label-title">备注：</span>
          <span class="label-box">
            <el-input
              v-model="remarks"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 5 }"
              placeholder="请输入内容"
              maxlength="50"
              show-word-limit
            ></el-input>
          </span>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { getInforRelease } from '@/api/contentManage/information'
import { ReleaseOrCancel } from '@/typings/contentManage/information'
import { ElMessage } from 'element-plus'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  publishStatus: {
    type: Number,
    required: true,
  },
  publishTerminal: {
    type: Number,
    required: true,
  },
})

// 提交
const { id, publishStatus, publishTerminal } = toRefs(props)
const dialogVisible = ref(false)
const remarks = ref('')
const emits = defineEmits(['reload-data'])
const onSubmit = async () => {
  const parameter: ReleaseOrCancel = {
    id: id.value,
    publishStatus: publishStatus.value,
    publishTerminal: publishTerminal.value,
    remarks: remarks.value,
  }
  const res = await getInforRelease(parameter)
  if (res.code === 200) {
    ElMessage({
      message:
        res.toastMessage || (publishStatus ? '取消发布成功' : '发布成功'),
      type: 'success',
    })
    dialogVisible.value = false
    emits('reload-data')
  }
}
const close = () => {
  remarks.value = ''
}
defineExpose({ dialogVisible })
</script>

<style scoped lang="scss">
.info-release {
  .content {
    .label-item {
      display: flex;

      .label-title {
        width: 80px;
      }

      .label-box {
        flex: 1;
      }
    }
  }
}
</style>
