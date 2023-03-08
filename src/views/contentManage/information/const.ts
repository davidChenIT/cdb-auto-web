// 发布状态
export const statusOptions = [
  {
    code: 0,
    name: '已发布',
  },
  {
    code: 1,
    name: '未发布',
  },
]

// 发布终端
export const termOption = [
  {
    dictValue: 0,
    dictLabel: 'WEB端',
  },
  {
    dictValue: 1,
    dictLabel: '移动端',
  },
  {
    dictValue: 2,
    dictLabel: 'WEB端,移动端',
  },
]

//
export enum ReleaseType {
  Release = 0, // 发布
  Cancel = 1, // 发布
}
