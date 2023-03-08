//import store from '@/store'
import { ElMessageBox } from 'element-plus'
export function roleChangeLogOutFunc() {
  ElMessageBox.alert('你的角色发生权限变动，请重新登录', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showCancelButton: false,
    showClose: false,
    cancelButtonClass: 'v-reset',
    confirmButtonClass: 'v-plain',
  })
    .then(() => {
      // store.dispatch('user/FedLogOut').then(() => {
      //   location.reload()
      // })
    })
    .catch(() => {
      //
    })
}
