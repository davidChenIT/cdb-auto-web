// api通用类型声明

/**
 * 后端接口响应体通用结构
 */
export interface CommonResponse {
  /**
   * 响应内容；
   */
  data: unknown
  /**
   * 报错信息；
   */
  message: string | null
  errorMessage?: string | null //错误消息提示  兼容字段 后续将会删除
  toastMessage?: string | null // 消息提示 兼容字段 后续会删除
  /**
   * 响应码/错误码；
   */
  code: number
}

/**
 * 列表结构响应体；
 */
export interface ListResponse<T> extends CommonResponse {
  data: {
    /**
     * 列表信息
     */
    record?: T[] // 列表数据 兼容字段
    records?: T[] // 列表数据 Array
    total: number // 总条数
    size: number // 非分页请求可置0
    current: number // 非分页请求可置0
  }
}

/**
 * 无页码列表类响应体结构（即数据为列表，不是对象）；兼容老api 到时需要全部改为ListResponse
 */
export interface ListResponseNoResults<T> extends CommonResponse {
  data: T[]
}

/**
 * 详情类响应体结构（即数据为对象，不是列表）；
 */
export interface DetailResponse<T> extends CommonResponse {
  data: T
  user?: T // 兼容获取用户信息接口 2022/09/09
}

/**
 * api地址定义列表；
 */
export interface UrlList {
  [name: string]: string | ((id: string) => string)
}

/**
 * 固定字符串型的api列表；
 */
export interface UrlString extends UrlList {
  [name: string]: string
}

/**
 * 通过函数返回api地址的api列表, 输入参数为一个
 */
export interface UrlFunction extends UrlList {
  [name: string]: (id: string) => string
}

/**
 * 通过函数返回api地址的api列表， 输入参数为两个
 */
export interface UrlSpecial {
  [name: string]: (options: string, id: string) => string
}

/**
 * 特殊响应体，投管无报错，但有其他业务场景的需返回场景码
 */
export interface SpecialResponse<T> extends CommonResponse {
  data: {
    message: number // 场景对应提示
    status: T // 场景枚举
  }
}

/**
 * 列表查询的通用参数；
 */
export interface ListQuery {
  /**
   * 当前页；
   */
  currentPage?: number
  current?: number // 兼容字段
  /**
   * 每页数量；
   */
  pageSize?: number
}

/** 业务结果通用参数 */
export interface BusinessResponse<T> {
  // 业务提示信息
  message: string
  // 业务枚举
  status: number
  // 具体数据
  data?: T
}
