import {
  TypeEnum,
  firstLevelList,
  secondLevelList,
  receiverList,
} from './const'

// 数据转换
export function dataFormat(value: number, type: number) {
  let item
  switch (type) {
    case TypeEnum.First_Level:
      item = firstLevelList.find((item) => {
        return +item.value === value
      })
      break
    case TypeEnum.Second_Level:
      item = secondLevelList.find((item) => {
        return +item.value === value
      })
      break
    case TypeEnum.Receiver_Type:
      item = receiverList.find((item) => {
        return +item.value === value
      })
      break
  }

  if (item) {
    return item.name
  }
  return '--'
}
