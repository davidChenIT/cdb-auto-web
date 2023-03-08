<template>
  <div class="v-container model-edit-box">
    <el-form label-width="120px" label-position="left" class="form-box">
      <el-form-item label="消息类型：">
        <span class="label">
          {{
            dataFormat(
              pageData.messageEvent.firstLevelType,
              TypeEnum.First_Level
            )
          }}
        </span>
      </el-form-item>
      <el-form-item label="二级分类：">
        <span>
          {{
            dataFormat(
              pageData.messageEvent.secondLevelType,
              TypeEnum.Receiver_Type
            )
          }}
        </span>
      </el-form-item>
      <el-form-item label="触发事件：">
        <span>{{ pageData.messageEvent.eventName }}</span>
      </el-form-item>
      <el-form-item label="接收人：">
        <span>
          {{
            dataFormat(
              pageData.messageEvent.receiverType,
              TypeEnum.Receiver_Type
            )
          }}
        </span>
      </el-form-item>
      <el-form-item label="发送形式：">
        <el-checkbox-group
          v-model="pageData.checkedPushType"
          @change="changeModel"
        >
          <el-checkbox v-for="p in pushWayList" :key="p.id" :label="p.name" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <!--PC模板-->
    <div v-show="pageData.showPCModel">
      <div class="label">PC模板</div>
      <el-form-item label="触达形式：">
        <el-checkbox v-model="pageData.pushPC">PC 弹窗</el-checkbox>
      </el-form-item>
      <el-form-item label="内容预览：">
        <div class="editor-box center-start">
          <!-- <quill-editor
            ref="myQuillEditor1"
            v-model="pageData.pcContent"
            class="editor"
            :options="pageData.editorOption"
            @focus="onEditorFocus($event)"
          ></quill-editor> -->

          <div class="empty-box"></div>
        </div>
      </el-form-item>
    </div>

    <!--APP模板-->
    <div v-show="pageData.showAppModel">
      <div class="label">APP模板</div>
      <el-form-item label="触达形式：">
        <el-checkbox v-model="pageData.pushPC">APP PUSH</el-checkbox>
      </el-form-item>
      <el-form-item label="内容预览：">
        <div class="editor-box center-start">
          <div class="empty-box"></div>
        </div>
      </el-form-item>
    </div>

    <!--邮件模板-->
    <div v-show="pageData.showEmailModel">
      <div class="label">邮件模板</div>
      <el-form-item label="内容预览：">
        <div class="editor-box center-start">
          <div class="empty-box"></div>
        </div>
      </el-form-item>
    </div>

    <!--短信模板-->
    <div v-show="pageData.showTextModel">
      <div class="label">短信模板</div>
      <el-form-item label="内容预览：">
        <div class="editor-box center-start">
          <div class="empty-box"></div>
        </div>
      </el-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { dataFormat } from './transform'
import { TypeEnum, pushWayList } from './const'
import {
  MessageEvent,
  TemplateEndPointList,
} from '@/typings/contentManage/template'
import { getMsgTemplateDetail } from '@/api/contentManage/template'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// import { quillEditor } from 'vue-quill-editor'

const route = useRoute()
const eventCode = route.query.eventCode as string

const pageData = reactive({
  messageEvent: {} as MessageEvent, // 消息事件
  templateEndPointList: [] as TemplateEndPointList[], // 模板列表
  checkedPushType: [] as string[], // 已选择的模板
  focusPosition: '',
  showPCModel: false, //PC
  showAppModel: false, // APP
  showEmailModel: false, // 邮件
  showTextModel: false, //短信
  pushPC: false, // PC弹窗
  pcContent: ref('111111'), // pc模板内容
  editorOption: {},
})

onMounted(() => {
  // const editor = new Quill('#pcBox', pageData.editorOption)
})

getMsgTemplateDetail(eventCode).then((res) => {
  if (res.code === 200) {
    const { messageEvent, templateEndPointList } = res.data
    pageData.messageEvent = messageEvent
    pageData.templateEndPointList = templateEndPointList
    templateEndPointList.forEach((element) => {
      switch (element.endPoint) {
        case 0:
          pageData.checkedPushType.push('PC')
          break
        case 1:
          pageData.checkedPushType.push('App')
          break
        case 2:
          pageData.checkedPushType.push('短信')
          break
        case 3:
          pageData.checkedPushType.push('邮件')
          break
        default:
          break
      }
    })
  }
})

// const checkedPushType = ref()
const changeModel = () => {
  console.log('checkedPushType', pageData.checkedPushType)
  if (pageData.checkedPushType.includes('PC')) {
    pageData.showPCModel = true
  } else {
    pageData.showPCModel = false
  }

  if (pageData.checkedPushType.includes('APP')) {
    pageData.showAppModel = true
  } else {
    pageData.showAppModel = false
  }

  if (pageData.checkedPushType.includes('邮件')) {
    pageData.showEmailModel = true
  } else {
    pageData.showEmailModel = false
  }

  if (pageData.checkedPushType.includes('短信')) {
    pageData.showTextModel = true
  } else {
    pageData.showTextModel = false
  }
}
</script>

<style scoped lang="scss">
.model-edit-box {
  // width: 100%;

  .form-box {
    // padding: 20px;
    margin-bottom: 100px;
  }

  .label {
    margin-bottom: 24px;
    font-size: 16px;
    color: #191919;
    letter-spacing: 0;
  }

  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 64px;
    background: #fff;
    box-shadow: 0 5px 20px 0 rgb(59 72 111 / 30%);
  }

  .editor-box {
    align-items: flex-start;
    width: 1128px;
    border: 1px solid #d4d9dd;

    .editor {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .empty-box {
      width: 600px;
      height: 36px;
      background: #fafbfc;
    }

    :deep(.el-input__inner) {
      color: #191919;
      background: #fafbfc;
      border: 0;
      border-radius: 0;
    }

    :deep(.el-input__suffix) {
      display: none;
    }
  }

  :deep(.ql-toolbar.ql-snow) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    padding: 0;
    line-height: 36px;
    background: #fafbfc;
    border: 0;
  }

  :deep(.ql-container.ql-snow) {
    height: 151px;
    border: 0;
  }
}
</style>
