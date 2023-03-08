import { ElMessageBox } from 'element-plus'
import useStore from '@/stores/index'
import { DictListData } from '@/typings/public'
const weeks = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
]

/** 登录状态过期提示公共方法 */
export function AccountVerifyAlert() {
  ElMessageBox.alert('登录状态已过期，请重新登录', '系统提示', {
    confirmButtonText: '重新登录',
    cancelButtonText: '取消',
    showCancelButton: false,
    showClose: false,
    cancelButtonClass: 'v-reset',
    confirmButtonClass: 'v-plain',
  })
    .then(() => {
      const { userStore } = useStore()
      userStore.FedLogOut().then(() => {
        location.reload()
      })
      // store.dispatch('user/FedLogOut').then(() => {
      //   location.reload()
      // })
    })
    .catch(() => {
      //
    })
  // window.$socket.close() // 账号失效时关闭连接
}
/**
 * 深拷贝 使用List缓存兼容ES5
 * @param source
 * @param cacheList  缓存List
 */
export function deepClone(source: any, cacheList?: any) {
  return null
}

/**
 * 时间格式转换
 * @param date 时间戳long
 * @param format 转换格式
 **/
export function GetTime(date: number | string, format?: string | null) {
  //var datetime = new Date(date * 1000)
  if (date === 0 || date === undefined) {
    return {
      mainDate: '--',
      allDate: '--',
      monDay: '--',
      mon: '--',
      yearMon: '--',
      noSsDate: '--',
      noYearDate: '--',
      noYearTime: '--',
      miniDate: '--',
      mdDate: '--',
      kData: '--',
      yymmdd: '--',
      yymmddN: '--',
      yymm: '--',
      mmdd: '--',
      hms: '--',
      hm: '--',
      year: '--',
      dd: '--',
      mm: '--',
    }
  }
  format = format || '/'
  const datetime = new Date(date)
  const YY = datetime.getFullYear()
  const MM =
    datetime.getMonth() + 1 < 10
      ? '0' + (datetime.getMonth() + 1)
      : datetime.getMonth() + 1
  const DD =
    datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
  const hh =
    (datetime.getHours() < 10
      ? '0' + datetime.getHours()
      : datetime.getHours()) + ':'
  const mm =
    datetime.getMinutes() < 10
      ? '0' + datetime.getMinutes()
      : datetime.getMinutes()
  const ss =
    ':' +
    (datetime.getSeconds() < 10
      ? '0' + datetime.getSeconds()
      : datetime.getSeconds())
  const day = datetime.getDay()
  let dateTime = ''
  dateTime = YY + format + MM + format + DD
  return {
    mainDate: dateTime,
    allDate: dateTime + ' ' + hh + mm + ss,
    monDay: MM + '/' + DD,
    mon: MM,
    yearMon: YY + '/' + MM,
    noSsDate: dateTime + ' ' + hh + mm,
    noYearDate: MM + format + DD + ' ' + hh + mm,
    noYearTime: MM + format + DD + ' ' + hh + mm + ss,
    miniDate: hh + mm,
    mdDate: MM + format + DD,
    kData: dateTime + ' ' + weeks[day],
    yymmdd: YY + format + MM + format + DD,
    yymmddN: YY + '年' + MM + '月' + DD + '日',
    yymm: YY + format + MM,
    mmdd: MM + format + DD,
    hms: hh + mm + ss,
    hm: hh + mm,
    year: YY,
    dd: DD,
    mm: mm,
  }
}

/**
 * [formatPrice description] 验证是否具有该按钮的权限
 * @param  {[type]} code [description] 权限按钮的code值
 * @return string
 */
export function permissions(str: string): boolean {
  const { userStore } = useStore()
  const storePer = userStore.buttonsCode
  let matchStr = false
  if (storePer && storePer.length > 0) {
    if (storePer.indexOf(`*:*:*`) > -1) {
      matchStr = true
    } else {
      matchStr = storePer.find((item) => item === str) ? true : false
    }
  } else {
    matchStr = false
  }
  return matchStr
}

/**
 * [formatPrice description] 匹配字典
 * @param  {[keyOption]} items [description] 数量值
 * @param  {[keys]} items [description] 数量值
 * @return string
 */
export function dictFun(keyOption: Array<any>, keys: string | number) {
  if (!Array.isArray(keyOption)) return '--'
  if (keys === undefined || keys === '') return '--'
  const para = keyOption.find((item) => {
    return item.dictValue === keys
  })
  if (para) {
    return para.dictLabel
  } else {
    return keys
  }
}
