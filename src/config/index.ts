// 全局配置文件

/**
 * 国际化语言枚举值
 */
export enum LanguageEnum {
  EN_US = 'en_US',
  ZH_CH = 'zh-Hans',
  ZH_HK = 'zh_Hant',
}

/**
 * 设备枚举值
 */
export enum DeviceEnum {
  Android = 1,
  IOS,
  PC,
  H5,
}

/**
 * 基础api枚举值，会存在不同的api开头地址
 */
export enum BaseApiEnum {
  INV_PC = '/inv-pc',
  SSO = '/sso',
}

/** 涨跌色枚举值 */
export enum QuotationColor {
  RED_UP_GREEN_DOWN, // 红涨绿跌
  GREEN_UP_RED_DOWN, // 绿涨红跌
}

/** 涨跌色类型 ru: 红涨绿跌 red-up缩写; gu: 绿涨红跌 green-up缩写 */
export type QuotationColorType = 'ru' | 'gu'

/** 涨跌色映射 */
export const QuotationColorMap: Record<QuotationColor, QuotationColorType> = {
  [QuotationColor.RED_UP_GREEN_DOWN]: 'ru',
  [QuotationColor.GREEN_UP_RED_DOWN]: 'gu',
}

/** 快捷自选分组开关 */
export enum QuicklyGroup {
  CLOSE, // 关闭
  OPEN, // 打开
}

/** 交易账户枚举 */
export enum ImitateFlag {
  IMITATE, // 模拟盘
  ACTUAL, // 实盘
}

/** 主题模式枚举 */
export enum ThemeMode {
  DARK, // 暗黑模式
  LIGHT, // 明亮
}

/** 主题类型 */
export type ThemeType = 'dark' | 'light'

/** 主题映射 */
export const ThemeMap: Record<ThemeMode, ThemeType> = {
  [ThemeMode.DARK]: 'dark',
  [ThemeMode.LIGHT]: 'light',
}

/** 盘前设置 */
export enum Competition {
  CLOSE, // 保持关闭
  OPEN, // 保持开启
  SMART_OPEN, // 智能开启
}

/** 买卖点设置 */
export enum TradePoint {
  CLOSE, // 关闭
  OPEN, // 打开
}

/** 复权设置 */
export enum Adjhkt {
  NOT = 'not', // 不复权
  FORWRAD = 'forward', // 前复权
  BACKWARD = 'backward', // 后复权
}

/** 账号验证类型枚举 */
export enum CodeTypeEnum {
  MOBILE = 1, // 手机号
  EMIAL = 2, // 邮箱
}

/** 侧边栏状态 */
export enum SidebarStatus {
  EXPAND, // 展开
  COLLASPE, // 收起
}
