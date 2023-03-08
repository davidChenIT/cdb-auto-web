import { UserConfigItem } from '@/typings/user/config'

/** 路由组件类型 */
export type RouteComponentType = 'Layout'

/** 用户组织信息 */
export interface UserDept {
  ancestors: string
  // 创建人
  createBy: string
  // 创建时间
  createTime: string
  delFlag: string
  // 组织id
  deptId: number
  // 组织名称
  deptName: string
  email: string
  leader: string
  orderNum: number
  // 上一级d
  parentId: number
  // 联系电话
  phone: string
  // 状态 这里是个字符串枚举，枚举值暂时未知
  status: string
  // 更新人
  updateBy: string
  // 更新时间
  updateTime: string
  // 用户id
  userId: number
}

/** 用户信息 很多字段都是未知含义，知道的小伙伴可以自行补充说明 冗余字段可删除*/
export interface UserInfo {
  accountNonExpired?: boolean
  accountNonLocked?: boolean
  authorities?: unknown
  avatar?: string
  browser?: unknown
  captchaKey?: unknown
  captchaVerifyCode?: unknown
  createBy?: unknown
  createTime?: unknown
  credentialsNonExpired?: boolean
  dept?: UserDept
  deptId?: unknown
  deviceAlias?: unknown
  deviceId?: unknown
  deviceType?: unknown
  // 邮箱
  email?: string
  enabled?: boolean
  expireTime?: unknown
  ipaddr?: unknown
  // 是否首次登录
  isFirstLogin?: boolean
  // 语言
  language?: null | string
  loginLocation?: unknown
  loginTime?: unknown
  master?: boolean
  // 昵称
  nickName?: string
  os?: unknown
  osName?: unknown
  password?: unknown
  permissions?: unknown
  phoneAreaCode?: '86'
  phonenumber?: '16625114720'
  postIds?: unknown
  remark?: unknown
  roleIds?: unknown
  roles?: unknown
  // 性别
  sex: string
  subDeptId?: unknown
  systemId?: unknown
  systemIds?: unknown
  token?: unknown
  user?: unknown
  userId?: unknown
  // 用户名
  userName?: string
  username?: string
}

/** 路由meta */
export interface UserRouteMeta {
  // 标题
  title: string
  // 图标
  icon: string
  // 副标题
  subTitle?: string
  typeTitles?: number
  // 不缓存
  noCache?: boolean
  // 固定
  affix?: boolean
}

/** 用户路由信息数据结构 */
export interface UserRoute {
  // 菜单id
  menuId?: number
  // 是否隐藏菜单
  hidden?: boolean
  // 路由标题
  name?: string
  // 路径
  path?: string
  // 标签信息
  meta?: UserRouteMeta
  // 是否一直显示
  alwaysShow?: boolean
  // 视图组件
  component: string | (() => void)
  // 重定向
  redirect?: string
  // 子路由
  children?: UserRoute[]
}

/** 用户登录成功数据结构 */
export interface UserLoginResponse {
  // 是否首次登录
  isFirstLogin: boolean
  // 用户token
  token: string
}

/** 用户配置数据结构 */
export interface UserConfig {
  // 配置项
  configItems: UserConfigItem
  // 自定义表头
  customTableHeaders: string
  pc: unknown
  searchRecords: string
  // 用户信息
  userInfo: UserInfo
  // roles
  roles: []
  user: UserInfo
}
