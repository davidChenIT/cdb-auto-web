<template>
  <el-dialog
    v-model="dialogVisible"
    title="新增模板"
    width="600px"
    @close="close"
  >
    <el-form
      ref="AddModelFormRef"
      :model="form"
      :rules="rules"
      label-width="140px"
    >
      <el-form-item prop="firstLevelType" label="消息类型:">
        <el-select v-model="form.firstLevelType" placeholder="请选择消息类型">
          <el-option
            v-for="(item, index) in firstLevelList"
            :key="index"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类:">
        <el-select v-model="form.secondLevelType" placeholder="请选择二级分类">
          <el-option
            v-for="(item, index) in secondLevelList"
            :key="index"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="触发规则代码:" prop="eventCode">
        <el-input v-model="form.eventCode" placeholder="请输入触发规则代码" />
      </el-form-item>
      <el-form-item label="触发规则名称:" prop="eventName">
        <el-input v-model="form.eventName" placeholder="请输入触发规则名称" />
      </el-form-item>
      <el-form-item label="接收人类型:" prop="receiverType">
        <el-select v-model="form.receiverType" placeholder="请选择接收人">
          <el-option
            v-for="(item, index) in receiverList"
            :key="index"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="消息事件触发类型" prop="eventType">
        <el-input
          v-model.number="form.eventType"
          placeholder="请输入消息事件触发类型"
        />
      </el-form-item>
      <el-form-item label="落地页" prop="landingPage">
        <el-input v-model="form.landingPage" placeholder="请输入落地页" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TemplateAdd } from '@/typings/contentManage/template'
import FormValidator from '@/utils/form'
import { firstLevelList, secondLevelList, receiverList } from '../const'
import { ElMessage, FormInstance } from 'element-plus'
import { addMessageEvent } from '@/api/contentManage/template'

const dialogVisible = ref(false)

const form = reactive<TemplateAdd>({
  firstLevelType: '',
  secondLevelType: '',
  eventCode: '',
  eventName: '',
  receiverType: '',
  eventType: undefined,
  landingPage: '',
})

// 表单校验规则
const rules = reactive({
  firstLevelType: new FormValidator().required('消息类型不可为空').getAll(),
  eventCode: new FormValidator().required('触发规则代码不可为空').getAll(),
  eventName: new FormValidator()
    .required('触发规则名称不可为空')
    .stringRange(0, 255, '最长输入255个字符')
    .getAll(),
  receiverType: new FormValidator().required('接收人类型不可为空').getAll(),
  eventType: new FormValidator()
    .addValidator((value: string) => {
      if (!value) {
        return true
      }
      const pattern = new RegExp('^[0-9]*[1-9][0-9]*$')
      return pattern.test(value)
    }, '请输入整数')
    .getAll(),
})

// 提交
const emits = defineEmits(['reload-data'])
const AddModelFormRef = ref<FormInstance>()
const onSubmit = () => {
  AddModelFormRef.value?.validate(async (valid) => {
    if (valid) {
      const res = await addMessageEvent(form)
      if (res.code === 200) {
        ElMessage({
          message: res.toastMessage || '新增成功',
          type: 'success',
        })
        dialogVisible.value = false
        emits('reload-data')
      }
    }
  })
}

// 关闭
const close = () => {
  AddModelFormRef.value?.resetFields()
}
defineExpose({ dialogVisible })
</script>

<style scoped lang="scss"></style>
