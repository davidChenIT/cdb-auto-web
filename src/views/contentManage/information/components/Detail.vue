<template>
  <el-dialog v-model="dialogVisible" :title="newsTitle" width="1000px">
    <!-- <div>{{ content }}</div> -->
    <div v-html="content"></div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  newsTitle: {
    type: String,
    required: true,
  },
})
const dialogVisible = ref(false)
const { content, newsTitle } = toRefs(props)
defineExpose({ dialogVisible })
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
  .el-dialog__body {
    min-height: 400px;
    max-height: 600px;
    overflow: auto;
  }
}
</style>
