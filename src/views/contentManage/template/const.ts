import { MessageType } from '@/typings/contentManage/template'

// 消息类型（一级分类）
export const firstLevelList: MessageType[] = [
  {
    name: '订单消息',
    value: '8',
  },
  {
    name: '账户消息',
    value: '7',
  },
  {
    name: '交易策略',
    value: '1',
  },

  {
    name: '选股策略',
    value: '15',
  },
  {
    name: '个股提醒',
    value: '5',
  },
  {
    name: '系统通知',
    value: '2',
  },
]

// 二级分类
export const secondLevelList: MessageType[] = [
  {
    name: '账户消息',
    value: '1',
  },
  {
    name: '机器手消息',
    value: '2',
  },
  {
    name: '分配提醒',
    value: '3',
  },
  {
    name: '剔除审核',
    value: '4',
  },
  {
    name: '待分配股票提醒',
    value: '5',
  },
  {
    name: '分配申请通过消息',
    value: '6',
  },
  {
    name: '分配申请驳回消息',
    value: '7',
  },
  {
    name: '股票池变动提醒',
    value: '8',
  },
]

// 接收人
export const receiverList: MessageType[] = [
  {
    name: '该主体有机器手权限的角色',
    value: '0',
  },
  {
    name: '该主体有策略审核权限的角色',
    value: '1',
  },
  {
    name: '策略负责人',
    value: '2',
  },
  {
    name: '该主体有总仓本设置权限的角色',
    value: '3',
  },
  {
    name: '该主体有指令审核权限的角色',
    value: '4',
  },
  {
    name: '指令负责人',
    value: '5',
  },
  {
    name: '订单负责人',
    value: '6',
  },
  {
    name: '该主体有分配股票权限的角色',
    value: '7',
  },
  {
    name: '部门下主账户持有人',
    value: '8',
  },
  {
    name: '对某策略设定了股票池变动提醒的用户',
    value: '9',
  },
  {
    name: '有权限审批的用户',
    value: '10',
  },
  {
    name: '申请分配的用户',
    value: '11',
  },
  {
    name: '持仓爬取用户',
    value: '12',
  },
  {
    name: '对账人',
    value: '13',
  },
]

// 转换类型枚举
export enum TypeEnum {
  First_Level = 1, // 消息类型（一级分类）
  Second_Level, // 二级分类
  Receiver_Type, // 接收人
}

export const pushWayList = [
  {
    id: 3,
    name: 'PC',
  },
  {
    id: 0,
    name: 'APP',
  },
  {
    id: 2,
    name: '邮件',
  },
  {
    id: 1,
    name: '短信',
  },
]
