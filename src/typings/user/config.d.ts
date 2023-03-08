import {
  QuotationColor,
  QuicklyGroup,
  ImitateFlag,
  ThemeMode,
  Competition,
  TradePoint,
  Adjhkt,
} from '@/config'

/** 用户全局设置对象 */
export interface UserConfigItem {
  // 复权设置
  adjhkt: Adjhkt
  // 涨跌色
  quotationColor: QuotationColor
  // 快捷自选分组开关
  quicklyGroup: QuicklyGroup
  // 选股监测提醒
  selectionMonitorRemind: number
  // 个股提醒
  stockRemind: number
  // 交易账户
  imitateFlag: ImitateFlag
  // 主题设置
  themeOption: ThemeMode
  // 盘前设置
  competition: Competition
  // 买卖点设置
  tradePoint: TradePoint
}
