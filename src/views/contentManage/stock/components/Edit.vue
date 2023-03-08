<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="修改证券名称"
      width="40%"
      append-to-body
      @close="close"
      @open="open"
    >
      <el-form
        ref="stockEditRef"
        :model="editDialog"
        label-width="90px"
        :hide-required-asterisk="true"
        :rules="rules"
      >
        <el-form-item label="证券代码：" prop="code">
          <el-input
            v-model="editDialog.code"
            disabled
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item label="证券名称：" prop="name">
          <el-input v-model="editDialog.name" placeholder="请输入" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import FormValidator from '@/utils/form'
import { ElMessage, FormInstance } from 'element-plus'
import { modifyStockItem } from '@/api/contentManage/stock'

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})
const { code, name } = toRefs(props)
const dialogVisible = ref(false)
const editDialog = reactive({
  code: '',
  name: '',
})

// 表单校验
const rules = reactive({
  // code: new FormValidator().required('股票代码不能为空').getAll(),
  name: new FormValidator().required('证券名称不能为空').getAll(),
})

// 提交
const stockEditRef = ref<FormInstance>()
const emits = defineEmits(['reload-data'])
const onSubmit = () => {
  stockEditRef.value?.validate(async (valid) => {
    if (valid) {
      const res = await modifyStockItem(editDialog)
      if (res.code === 200) {
        ElMessage({
          message: res.toastMessage || '修改成功',
          type: 'success',
        })
        dialogVisible.value = false
        emits('reload-data')
      }
    }
  })
}

//关闭的回调
const close = () => {
  editDialog.name = ''
  editDialog.code = ''
}

//打开 赋值回显
const open = () => {
  editDialog.code = code.value
  editDialog.name = name.value
}

defineExpose({ dialogVisible })
</script>

<style scoped lang="scss"></style>
