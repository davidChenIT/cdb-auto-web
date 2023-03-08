import request from '@/utils/request'
import { UrlString, ListResponseNoResults } from '@/typings/api'
import { DictListData } from '@/typings/public'

const url: UrlString = {
  dictsData: '/auth/system/dict/data/type', // 字典数据
}

/**
 *字典数据列表
 * @param type
 * @returns
 */

export function getDictsData(
  type: string
): Promise<ListResponseNoResults<DictListData>> {
  return request({
    url: `${url.dictsData}/${type}`,
    method: 'get',
    noModel: true,
  })
}
