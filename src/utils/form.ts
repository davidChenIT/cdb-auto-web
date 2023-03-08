import { FormItemRule } from 'element-plus'
import type { Arrayable } from 'element-plus/es/utils'
/**
 * 全局表单校验类
 */
export default class FormValidator {
  // 校验方法
  private validators: any[] = []

  private asyncValidators: any[] = []

  // 规则
  private rules: FormItemRule[] = []

  // 触发条件
  private trigger: Arrayable<string> = ''
  /**
   * @param {string|Array} trigger 验证触发时机
   */
  constructor(trigger: Arrayable<string> = 'blur') {
    this.validators = []
    this.rules = []
    this.trigger = trigger
    return this
  }

  /**
   * 添加一个验证函数（验证函数为默认回调函数结构）
   * @param {Function} validator 验证函数
   * @param {string} message 错误提示
   */
  addValidatorDefault(validator: any, message: any, isAsync = false) {
    const rule = {
      validator,
      message,
    }
    if (isAsync) {
      this.asyncValidators.push(rule)
    } else {
      this.validators.push(rule)
    }
    return this
  }

  /**
   * 添加一个验证函数，只接收表单值做参数（兼容外部校验库）
   * @param {Function} validator 验证函数
   * @param {string} message 错误提示
   */
  addValidator(validator: any, message: any, isAsync = false) {
    const cb = ({ value }: any) => {
      return validator(value)
    }

    const rule = {
      validator: cb,
      message,
    }
    if (isAsync) {
      this.asyncValidators.push(rule)
    } else {
      this.validators.push(rule)
    }

    return this
  }

  /**
   * 添加必备（不能为空）验证
   * @param {string} message 错误提示
   */
  required(message = '不能为空！') {
    const rule: FormItemRule = {
      required: true,
      message,
      trigger: this.trigger,
    }
    this.rules.push(rule)
    return this
  }

  /**
   * 验证字符串长度范围
   * @param {number} min 字符串最小长度
   * @param {number} max 字符串最大长度
   * @param {string} message 错误提示
   */
  stringRange(min: any, max: any, message = `字符长度为${min}~${max}！`) {
    const rule: FormItemRule = {
      type: 'string',
      message,
      min,
      max,
      trigger: this.trigger,
    }
    this.rules.push(rule)
    return this
  }

  /**
   * 验证手机号 TODO: 暂时无法动态更新区号
   * @param message 错误提示
   * @param areaCode 区号 这里需要动态传入
   */
  mobileValidator(message = '请输入正确的手机号码', cb: () => string | '86') {
    const areaCode = cb && cb()
    const validator = ({ value }: any) => {
      let regex = /^1(3|4|5|6|7|8|9)\d{9}$/
      const otherCode = ['65', '852']
      if (otherCode.includes(areaCode)) {
        regex = /^\d{8}$/
      }
      return regex.test(value)
    }

    this.addValidator(validator, message)
    return this
  }

  /**
   * 验证邮箱
   * @param {string} message 错误提示
   */
  email(message = '请输入正确的邮箱地址') {
    this.rules.push({
      type: 'email',
      message,
      trigger: this.trigger,
    })
    return this
  }

  /**
   * 获取最终的表单项验证规则（数组）
   */
  getAll() {
    const res = JSON.parse(JSON.stringify(this.rules)) // 复制普通验证规则
    /**
     * 将所有的验证函数转换成一条验证规则，按照数组中顺序逐条检测
     * @param {array} rule 表单项验证规则
     * @param {*} value 表单项值
     * @param {Function} cb 验证结果回调函数，不传参则为通过验证，传Error对象则代表不通过
     * @param {*} source 整个表单对象
     */
    // if (this.validators.length) {
    // const promises = [] // 存储promise
    // const messages = [] // 存储message
    // const validator = async (rule, value, cb, source) => {
    //   for (const item of this.validators) {
    //     promises.push(
    //       item.validator({
    //         rule,
    //         value,
    //         source,
    //       })
    //     )
    //     messages.push(item.message)
    //   }
    //   // 等待所有的promise结果
    //   const valids = await Promise.all(promises)
    //   for (let i = 0; i < valids.length; i++) {
    //     if (!valids[i]) {
    //       // 检测是否符合规则
    //       cb(new Error(messages[i]))
    //       // 清空缓存
    //       promises.length = 0
    //       messages.length = 0
    //       return false
    //     }
    //   }
    //   cb()
    //   return true
    // }
    //   res.push({
    //     trigger: this.trigger,
    //     validator,
    //   })
    // }

    let errorCount = 0

    if (this.validators.length) {
      const validator = (rule: any, value: any, cb: any, source: any) => {
        for (const item of this.validators) {
          const isValid = item.validator({
            rule,
            value,
            source,
          })
          if (!isValid) {
            // 检测是否符合规则
            cb(new Error(item.message))
            ++errorCount
            return false
          }
        }
        cb()
        ++errorCount
        return true
      }
      res.push({
        trigger: this.trigger,
        validator,
      })
    }

    if (this.asyncValidators.length) {
      // const promises = [] // 存储promise
      // const messages = [] // 存储message
      const asyncValidator = (rule: any, value: any, cb: any, source: any) => {
        if (errorCount > 0) {
          return
        }
        return new Promise((resolve, reject) => {
          for (const item of this.asyncValidators) {
            item
              .validator({
                rule,
                value,
                source,
              })
              .then((data: any) => {
                console.log('item.data', data)
                resolve(data)
              })
              .catch(() => {
                console.log('item.message', item.message)
                reject(item.message)
              })
          }
        })
      }

      res.push({
        trigger: this.trigger,
        asyncValidator,
      })
    }

    return res
  }
}
